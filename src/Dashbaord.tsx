import { currencyFormatter } from "./util";
import React from "react";

interface DashboardProps {
  totalRevenue: number;
}

const Dashboard: React.FC<DashboardProps> = ({ totalRevenue }) => {
  return (
    <div className="dashboard mt-8">
      <h2 className="text-xl font-bold mb-4">Revenue Dashboard</h2>
      <div className="text-lg">
        Total Revenue: {currencyFormatter.format(totalRevenue)}
      </div>
    </div>
  );
};

export default Dashboard;
