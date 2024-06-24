// src/components/BookingForm.tsx

import React, { useState } from "react";
import { currencyFormatter } from "./util";

const BookingForm: React.FC = ({ markDesk }: { markDesk: () => void }) => {
  const [hours, setHours] = useState<number>(1);
  const [memberType, setMemberType] = useState<string>("basic");
  const [deskType, setDeskType] = useState<string>("individual");
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleBooking = () => {
    const pricePerHour =
      deskType === "individual" ? getIndividualDeskPrice() : 25;
    const total = calculateTotal(pricePerHour);
    setTotalAmount(total);
  };

  const getIndividualDeskPrice = () => {
    switch (memberType) {
      case "basic":
        return 10;
      case "premium":
        return 15;
      case "executive":
        return 20;
      default:
        return 10;
    }
  };

  const calculateTotal = (pricePerHour: number) => {
    let total = hours * pricePerHour;
    if (hours > 3) {
      total *= 0.9; // Apply 10% discount for more than 3 hours
    }
    return total;
  };

  return (
    <div className="booking-form flex flex-col items-start gap-4 justify-center">
      <h2>Booking Form</h2>

      <div className="flex items-center justify-center gap-4">
        <div>
          <label htmlFor="hours">Hours:</label>
          <input
            type="number"
            id="hours"
            className="border border-gray-400"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="memberType">Member Type:</label>
          <select
            id="memberType"
            value={memberType}
            className="border border-gray-400"
            onChange={(e) => setMemberType(e.target.value)}
          >
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="executive">Executive</option>
          </select>
        </div>
        <div>
          <label htmlFor="deskType">Desk Type:</label>
          <select
            id="deskType"
            value={deskType}
            className="border border-gray-400"
            onChange={(e) => setDeskType(e.target.value)}
          >
            <option value="individual">Individual</option>
            <option value="team">Team</option>
          </select>
        </div>
      </div>
      <button
        onClick={() => {
          handleBooking;
          markDesk;
        }}
        className="w-fit h-6 bg-slate-500 p-2 rounded-lg flex items-center justify-center"
      >
        Book Desk
      </button>
      {totalAmount > 0 && (
        <p>Total Charged: {currencyFormatter.format(totalAmount.toFixed(2))}</p>
      )}
    </div>
  );
};

export default BookingForm;
