import { useState } from "react";
import { ChartColorScheme } from "../features/weather/types";
import { useWeatherContext } from "../features/weather/WeatherProvider";

export default function Legend() {
  const { weatherCards } = useWeatherContext();
  const [isOpen, setIsOpen] = useState(false);

  if (!weatherCards.startData.chartData) return null;

  const legendItems = [
    { label: "Temperature (°F)", color: ChartColorScheme.Temperature },
    { label: "Humidity", color: ChartColorScheme.Humidity },
    { label: "Chance of Precipitation", color: ChartColorScheme.Precipitation },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Toggle Button for <sm */}
      {!isOpen && (
        <button
          className="flex items-center justify-center px-4 py-2 mb-4 text-sm font-bold text-white bg-blue-500 shadow-md trans2ition-colors rounded-2xl sm:hidden hover:bg-blue-600"
          onClick={() => setIsOpen(true)}
        >
          Show Legend
        </button>
      )}

      {/* Legend Content */}
      {(isOpen || window.innerWidth >= 640) && (
        <div className="relative flex flex-col sm:flex-row sm:h-5 sm:justify-between w-full sm:w-[500px] bg-white p-4 rounded-lg shadow-md gap-4 sm:gap-0">
          {/* Close Button */}
          <button
            className="absolute text-gray-500 transition-colors top-2 right-2 hover:text-gray-700 sm:hidden"
            onClick={() => setIsOpen(false)}
          >
            &#x2715;
          </button>

          {legendItems.map(({ label, color }, index) => (
            <div
              key={index}
              className="flex items-center gap-3 transition-opacity group hover:opacity-90"
            >
              <div
                className="w-6 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <p className="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-900">
                {label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
