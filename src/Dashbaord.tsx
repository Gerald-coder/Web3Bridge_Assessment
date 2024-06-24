// import React from "react";

// const Dashboard: React.FC = () => {
//   // Logic to fetch and display revenue data
//   return (
//     <div className="dashboard">
//       <h2>Revenue Dashboard</h2>
//       {/* Display revenue data here */}
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";

interface DashboardProps {
  totalRevenue: number;
}

const Dashboard: React.FC<DashboardProps> = ({ totalRevenue }) => {
  return (
    <div className="dashboard mt-8">
      <h2 className="text-xl font-bold mb-4">Revenue Dashboard</h2>
      <div className="text-lg">Total Revenue: ${totalRevenue.toFixed(2)}</div>
    </div>
  );
};

export default Dashboard;
