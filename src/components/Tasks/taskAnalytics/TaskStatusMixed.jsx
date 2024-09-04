import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

function TaskStatusBarChart() {
  const tasks = useSelector((state) => state.task.tasks);

  const statusCounts = {
    todo: 0,
    inProgress: 0,
    completed: 0,
  };

  tasks.forEach((task) => {
    if (task.status === "todo") statusCounts.todo += 1;
    if (task.status === "in-progress") statusCounts.inProgress += 1;
    if (task.status === "completed") statusCounts.completed += 1;
  });
  const data = {
    labels: ["todo", "in progress", "completed"],

    datasets: [
      {
        label: "Tasks",
        data: [
          statusCounts.todo,
          statusCounts.inProgress,
          statusCounts.completed,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const totalTasks = tasks.length;
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(totalTasks, 20),
        ticks: {
          callback: function (value) {
            return value;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-center text-xl font-semibold mb-4">
        Task Status Mixed Chart
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default TaskStatusBarChart;
