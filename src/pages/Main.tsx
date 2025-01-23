import WeatherChart from "../components/WeatherChart";
import WeatherHeader from "../components/WeatherHeader";
import WeatherInputs from "../components/WeatherInputs";
import {
  useWeatherContext,
  WeatherProvider,
} from "../features/weather/WeatherProvider";

function ChartContainer() {
  const { chartData, selectedPeriod } = useWeatherContext();
  console.log({chartData})
  if (!chartData.startData || !chartData.endData) return null;
  return (
    <div className="flex justify-between w-full gap-8 bg-red-300 h-[400px]">
      <WeatherChart chartData={chartData.startData[selectedPeriod.value]} />
      <WeatherChart chartData={chartData.endData[selectedPeriod.value]} />
    </div>
  );
}

export default function Main() {
  return (
    <WeatherProvider>
      <div className="w-full bg-gray-50">
        <WeatherHeader />
        <div className="flex flex-col max-w-5xl mx-auto" style={{ height: "calc(100vh - 80px)" }}>
          <div className="w-full py-8">
            <WeatherInputs />
          </div>
          <ChartContainer />
        </div>
      </div>
    </WeatherProvider>
  );
}
