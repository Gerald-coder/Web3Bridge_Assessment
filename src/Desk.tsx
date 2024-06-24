// import React from "react";
// import classNames from "classnames";

// interface DeskProps {
//   type: "individual" | "team";
//   booked: boolean;
//   onClick: () => void;
// }

// const Desk: React.FC<DeskProps> = ({ type, booked, onClick }) => {
//   const deskClasses = classNames("desk", "p-4", "rounded", "cursor-pointer", {
//     "bg-red-500": booked,
//     "bg-green-500": !booked,
//     "text-white": true,
//   });

//   return (
//     <div className={deskClasses} onClick={onClick}>
//       {type === "individual" ? "Individual Desk" : "Team Desk"}
//     </div>
//   );
// };

// export default Desk;

import React, { useState } from "react";
import classNames from "classnames";

interface DeskProps {
  id: number;
  type: "individual" | "team";
  booked: boolean;
  onClick: (id: number) => void;
}

const Desk: React.FC<DeskProps> = ({ id, type, booked, onClick }) => {
  const [bookingHours, setBookingHours] = useState(1); // Default to 1 hour booking
  const membershipRates = {
    Basic: 10,
    Premium: 15,
    Executive: 20,
  };

  const handleBookDesk = () => {
    onClick(id);
  };

  const handleBookingHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value);
    setBookingHours(hours);
  };

  const calculateTotalCharge = () => {
    let rate = type === "team" ? 25 : membershipRates["Basic"]; // Default to Basic rate for individual desks
    if (type === "individual") {
      if (bookingHours > 3) {
        rate = rate * bookingHours * 0.9; // Apply 10% discount for bookings > 3 hours
      } else {
        rate = rate * bookingHours;
      }
    } else {
      rate = 25 * bookingHours; // Fixed rate for team desks
    }
    return rate.toFixed(2); // Format to 2 decimal places
  };

  const deskClasses = classNames("desk", "p-4", "rounded", "cursor-pointer", {
    "bg-red-500": booked,
    "bg-green-500": !booked,
    "text-white": true,
  });

  return (
    <div className={deskClasses} onClick={handleBookDesk}>
      {type === "individual" ? "Individual Desk" : "Team Desk"}
      {!booked && (
        <div className="booking-controls mt-2">
          <input
            type="number"
            min="1"
            max="24" // Assuming maximum booking duration is 24 hours
            value={bookingHours}
            onChange={handleBookingHoursChange}
            className="mr-2 p-2 border border-gray-300 rounded"
          />
          <button onClick={handleBookDesk} className="book-button">
            Book
          </button>
        </div>
      )}
      {booked && (
        <div className="text-sm mt-2">
          Booked for {bookingHours} hour(s). Total: ${calculateTotalCharge()}
        </div>
      )}
    </div>
  );
};

export default Desk;
