import React, { useState } from "react";
import classNames from "classnames";
import { currencyFormatter } from "./util";

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
    let rate = type === "team" ? 25 : membershipRates["Basic"];
    if (type === "individual") {
      if (bookingHours > 3) {
        rate = rate * bookingHours * 0.9;
      } else {
        rate = rate * bookingHours;
      }
    } else {
      rate = 25 * bookingHours;
    }
    return rate.toFixed(2);
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
            max="24"
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
          Booked for {bookingHours} hour(s). Total:{" "}
          {currencyFormatter.format(calculateTotalCharge())}
        </div>
      )}
    </div>
  );
};

export default Desk;
