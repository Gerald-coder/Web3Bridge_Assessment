import React, { useState } from "react";
import Desk from "./Desk";
import Dashboard from "./Dashbaord";

const App: React.FC = () => {
  const [desks, setDesks] = useState<
    { id: number; type: string; booked: boolean }[]
  >([
    { id: 1, type: "individual", booked: false },
    { id: 2, type: "individual", booked: false },
    { id: 3, type: "individual", booked: false },
    { id: 4, type: "individual", booked: false },
    { id: 5, type: "individual", booked: false },
    { id: 6, type: "individual", booked: false },
    { id: 7, type: "individual", booked: false },
    { id: 8, type: "individual", booked: false },
    { id: 9, type: "individual", booked: false },
    { id: 10, type: "individual", booked: false },
    { id: 11, type: "team", booked: false },
    { id: 12, type: "team", booked: false },
    { id: 13, type: "team", booked: false },
    { id: 14, type: "team", booked: false },
    { id: 15, type: "team", booked: false },
  ]);

  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  const handleDeskClick = (id: number) => {
    const updatedDesks = desks.map((desk) =>
      desk.id === id ? { ...desk, booked: !desk.booked } : desk
    );
    setDesks(updatedDesks);
  };

  const calculateTotalRevenue = () => {
    let revenue = 0;
    desks.forEach((desk) => {
      if (desk.booked) {
        const rate = desk.type === "team" ? 25 : 10;
        revenue += rate;
      }
    });
    return revenue;
  };

  React.useEffect(() => {
    const revenue = calculateTotalRevenue();
    setTotalRevenue(revenue);
  }, [desks]);
  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-4">
        Co-working Space Booking System
      </h1>
      <div className="desks grid grid-cols-2 gap-4 mb-8">
        {desks.map((desk) => (
          <Desk
            key={desk.id}
            id={desk.id}
            type={desk.type}
            booked={desk.booked}
            onClick={handleDeskClick}
          />
        ))}
      </div>
      <Dashboard totalRevenue={totalRevenue} />
    </div>
  );
};

export default App;
