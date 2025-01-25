import { ChevronLeft } from "lucide-react";
import WeatherIOLogo from "../../../components/icons/WeatherIOLogo";
import { useWeatherContext } from "../context/WeatherProvider";
import WeatherCard from "./WeatherCard/WeatherCard";

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

export function WeatherCardsContainer() {
  const { selectedLocation, weatherCards, selectedPeriod, handleNavigate } =
    useWeatherContext();

  if (!selectedLocation || !weatherCards.startData.dayData) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[400px] gap-4 p-6 mx-auto bg-white shadow-sm rounded-xl">
        <WeatherIOLogo />
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to WEATHER.IO!
          </h1>
          <p className="text-lg text-gray-600">
            Enter your location to discover the weather near you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center w-full">
      <NavButton handleNavigate={() => handleNavigate(-1)} />
      <div className="flex items-center w-full h-full gap-8">
        <WeatherCard
          chartData={weatherCards.startData.chartData?.[selectedPeriod.value]}
          dayData={weatherCards.startData.dayData}
        />
        <div className={`w-full h-full hidden md:block`}>
          <WeatherCard
            chartData={weatherCards.endData.chartData?.[selectedPeriod.value]}
            dayData={weatherCards.endData.dayData}
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
