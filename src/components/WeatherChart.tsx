import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PeriodWeatherData } from "../features/weather/types";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type WeatherChartProps = {
    chartData: PeriodWeatherData
};

const WeatherChart = ({ chartData }: WeatherChartProps) => {
  const data = {
    labels: chartData.hours,
    datasets: [
      {
        label: "Temperature (°C)",
        data: chartData.temperatures,
        borderColor: "red",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Humidity (%)",
        data: chartData.humidity,
        borderColor: "green",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Precipitation Probability (%)",
        data: chartData.precipitation,
        borderColor: "blue",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true, // Enables responsiveness
    maintainAspectRatio: false, // Allows height and width control
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        // text: `Weather Data for ${selectedDay}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (Hours)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
      },
    },
  };

  return (
    <div className="w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherChart;
