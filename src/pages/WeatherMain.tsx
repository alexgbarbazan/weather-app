import WeatherChart from "../components/WeatherChart";
import WeatherHeader from "../components/WeatherHeader";
import WeatherInputs from "../components/WeatherInputs";
import {
  useWeatherContext,
  WeatherProvider,
} from "../features/weather/WeatherProvider";
import { ChartColorScheme } from "../features/weather/types";

// function WeatherCard() {
//   const { weatherCards, selectedPeriod, handleNavigate, weatherDataCache } =
//     useWeatherContext();

//   if (!weatherCards.startData || !weatherCards.endData) return null;

//   return (
//     <div className="flex justify-between w-full h-full gap-8 shadow-lg ">
//       <WeatherChart
//         chartData={weatherCards.startData.chartData?.[selectedPeriod.value]}
//       />
//     </div>
//   );
// }

function ChartContainer() {
  const { weatherCards, selectedPeriod } =
    useWeatherContext();
  if (!weatherCards.startData || !weatherCards.endData) return null;
  console.log({ weatherCards });
  return (
    <div className="flex items-center gap-8 w-full h-[400px]">
      <WeatherChart
        chartData={weatherCards.startData.chartData?.[selectedPeriod.value]}
        period={selectedPeriod.label}
      />
      <WeatherChart
        chartData={weatherCards.endData.chartData?.[selectedPeriod.value]}
        period={selectedPeriod.label}
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
            className="flex flex-col w-full max-w-5xl"
            style={{ height: "calc(100vh - 80px)" }}
          >
            <div className="w-full py-8">
              <WeatherInputs />
            </div>
            <ChartContainer />
            <div className="flex justify-center w-full">
              <div className="flex h-[20px] mt-6 justify-between w-[500px]">
                <div className="flex items-center gap-2">
                  <div
                    className=" h-[5px] w-[10px]"
                    style={{ background: ChartColorScheme.Temperature }}
                  />
                  <p>Temperature (°F) </p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className=" h-[5px] w-[10px]"
                    style={{ background: ChartColorScheme.Humidity }}
                  />
                  <p>Humidity </p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-[5px] w-[10px]"
                    style={{ background: ChartColorScheme.Precipitation }}
                  />
                  <p>Chance of Precipitation </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
}
