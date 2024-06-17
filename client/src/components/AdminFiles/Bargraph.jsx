import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarChartComponent = ({ April, May, June }) => {
  // Data for the Bar chart
  const data = {
    labels: ["April", "May", "June"],
    datasets: [
      {
        label: "Number of Users",
        data: [April, May, June],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Registration Over Time",
      },
    },
  };

  return (
    <div className=" h-" style={{ height: "100%" }}>
      <h2>User Registration Over Time</h2>
      <Bar
        data={data}
        options={options}
        // style={{ height: "100%" }}
        // height="100%"
      />
    </div>
  );
};

export default BarChartComponent;
