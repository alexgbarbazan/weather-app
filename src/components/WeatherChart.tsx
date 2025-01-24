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
  ChartOptions,
} from "chart.js";
import { ChartColorScheme, PeriodWeatherData } from "../features/weather/types";
import annotationPlugin from "chartjs-plugin-annotation";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

type WeatherChartProps = {
  period: string;
  chartData?: PeriodWeatherData;
};

const WeatherChart = ({ chartData, period }: WeatherChartProps) => {
  if (!chartData)
    return <div className="w-full h-[20px] bg-white">No data</div>;

  const data = {
    labels: chartData.hours,
    datasets: [
      {
        label: "Temperature",
        data: chartData.temperatures,
        borderColor: ChartColorScheme.Temperature,
        tension: 0.4,
        fill: false,
        pointRadius: 0,
      },
      {
        label: "Humidity",
        data: chartData.humidity,
        borderColor: ChartColorScheme.Humidity,
        tension: 0.4,
        fill: false,
        pointRadius: 0,
      },
      {
        label: "Precipitation",
        data: chartData.precipitation,
        borderColor: "blue",
        tension: 0.4,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true, // Enables responsiveness
    maintainAspectRatio: false, // Allows height and width control
    scales: {
      x: {
        title: {
        display: true, // Enables the title
        text: period, // The label for the x-axis
      },
        grid: {
          display: false,
        },
        ticks: {
          font: (context: any) => {
            const index = context.index;
            return {
              weight:
                index >= 2 && index < chartData.hours.length - 2
                  ? "bold"
                  : "normal",
            };
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Temperature (°F)", // Updated for Fahrenheit
        },
        ticks: {
          callback: (value: string | number) => `${value}°F`, // Format temperature in Fahrenheit
        },
      },
      y2: {
        // Right Y-axis for humidity and precipitation
        grid: {
          drawOnChartArea: false, // Disable grid for this axis
        },
        position: "right",
        title: {
          display: true,
          text: "%", // Label for percentage values
        },
        ticks: {
          callback: (tickValue: string | number) => `${Number(tickValue) * 100}%`, // Format as percentage
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        // position: "bottom", // Moves the legend to the bottom
      },
      annotation: {
        annotations: {
          verticalLine1: {
            type: "line",
            xMin: 2,
            xMax: 2,
            borderColor: "black",
            borderWidth: 1, // Thin line width
            borderDash: [5, 5], // Dashed line
            label: {
              display: true,
              content: "Start",
              position: "start",
            },
          },
          verticalLine2: {
            type: "line",
            xMin: chartData.hours.length - 3,
            xMax: chartData.hours.length - 3,
            borderColor: "black",
            borderWidth: 1, // Thin line width
            borderDash: [5, 5], // Dashed line
            label: {
              display: true,
              content: "End",
              position: "start",
            },
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} className="!w-full" />
    </div>
  );
};

export default WeatherChart;
