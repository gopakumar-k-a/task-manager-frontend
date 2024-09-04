import React from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskStatusChart = () => {
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

  const totalTasks = tasks.length;

  const data = {
    labels: ["todo", "in progress", "completed"],
    datasets: [
      {
        label: "Number of Status",
        data: [
          statusCounts.todo,
          statusCounts.inProgress,
          statusCounts.completed,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          generateLabels: function(chart) {
            const original = ChartJS.defaults.plugins.legend.labels.generateLabels;
            const labels = original.call(this, chart);

            labels.push({
              text: `Total Tasks: ${totalTasks}`,
              fillStyle: 'transparent',
              fontColor: '#000', 
              hidden: true, 
            });

            return labels;
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / totalTasks) * 100).toFixed(2) + '%';
            return `${label}: ${value} (${percentage})`;
          }
        }
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-center text-xl font-semibold mb-4">
        Task Status Pie Chart
      </h2>
      <Doughnut data={data} options={options} />
      <p className="text-center mt-4">Total Tasks: {totalTasks}</p>
    </div>
  );
};

export default TaskStatusChart;
