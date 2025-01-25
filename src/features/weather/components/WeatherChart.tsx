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
import { ChartColorScheme, PeriodWeatherData } from "../types";
import annotationPlugin from "chartjs-plugin-annotation";

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
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: period,
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

        ticks: {
          callback: (value: string | number) => `${value}°F`,
        },
      },
      y2: {
        grid: {
          drawOnChartArea: false,
        },
        position: "right",
        ticks: {
          callback: (tickValue: string | number) =>
            `${Number(tickValue) * 100}%`,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          verticalLine1: {
            type: "line",
            xMin: 2,
            xMax: 2,
            borderColor: "black",
            borderWidth: 1,
            borderDash: [5, 5],
          },
          verticalLine2: {
            type: "line",
            xMin: chartData.hours.length - 3,
            xMax: chartData.hours.length - 3,
            borderColor: "black",
            borderWidth: 1,
            borderDash: [5, 5],
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
