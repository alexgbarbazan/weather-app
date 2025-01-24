import Legend from "../components/Legend";
import WeatherChart from "../components/WeatherChart";
import WeatherHeader from "../components/WeatherHeader";
import WeatherInputs from "../components/WeatherInputs";
import WeatherLocation from "../components/WeatherLocation";
import {
  useWeatherContext,
  WeatherProvider,
} from "../features/weather/WeatherProvider";

import { ChevronLeft } from "lucide-react";

function NavButton({
  handleNavigate,
  className,
}: {
  handleNavigate: () => void;
  className?: string;
}) {
  return (
    <button
      className={`[&>svg>path]:stroke-gray-500 hover:[&>svg>path]:stroke-blue-500 h-[35px] md:h-[50px] lg:h-[50px] ${className}`}
      onClick={handleNavigate}
    >
      <ChevronLeft className="w-auto h-full" />
    </button>
  );
}

function ChartContainer() {
  const { weatherCards, selectedPeriod, handleNavigate } = useWeatherContext();
  if (!weatherCards.startData || !weatherCards.endData) return null;
  console.log({ weatherCards });
  return (
    <div className="flex items-center  w-full h-[400px]">
      {/* <button className="[&>svg>path]:stroke-gray-500 hover:[&>svg>path]:stroke-blue-500 h-[50px]" onClick={() => handleNavigate(-1)}>
        <ChevronLeft className="w-auto h-full " />
      </button> */}
      <NavButton handleNavigate={() => handleNavigate(-1)} />
      <div className="flex items-center w-full h-full gap-8">
        <WeatherChart
          chartData={weatherCards.startData.chartData?.[selectedPeriod.value]}
          period={selectedPeriod.label}
        />
        <div className={`w-full h-full hidden md:block`}>
          <WeatherChart
            chartData={weatherCards.endData.chartData?.[selectedPeriod.value]}
            period={selectedPeriod.label}
          />
        </div>
      </div>
      <NavButton
        handleNavigate={() => handleNavigate(1)}
        className="rotate-180"
      />
    </div>
  );
}

export default function WeatherMain() {
  return (
    <WeatherProvider>
      <div className="w-full bg-gray-50">
        <WeatherHeader />
        <div className="flex flex-col items-center px-6">
          <div
            className="flex flex-col w-full max-w-5xl gap-8"
            style={{ height: "calc(100vh - 80px)" }}
          >
            <div className="w-full pt-8">
              <WeatherInputs />
            </div>
            <WeatherLocation  />
            <div className="sm:hidden">
              <Legend />
            </div>
            <ChartContainer />
            <div className="hidden sm:block">
              <Legend />
            </div>
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
}
