import { PeriodWeatherData } from "../../types";
import { WeatherAPIResponse, WeatherDay } from "../../types/weather-api";
import { useWeatherContext } from "../../context/WeatherProvider";
import WeatherChart from "../WeatherChart";
import WeatherCardTemperatureSection from "../WeatherCardTemperatureSection";
import {
  getWindDetail,
  getPrecipitationDetail,
  formatDateComparison,
  getDescription,
  getPeriodDescription,
} from "./utils";

function RightDescriptionSection({
  day,
}: {
  day: WeatherDay;
}) {
  return (
    <div className="flex flex-col justify-end gap-1">
      {getWindDetail(day)}
      {getPrecipitationDetail(day)}
    </div>
  );
}

export default function WeatherCard({
  chartData,
  dayData,
}: {
  chartData?: PeriodWeatherData;
  dayData?: WeatherAPIResponse;
}) {
  const { selectedPeriod } = useWeatherContext();

  if (!dayData) return null;

  const day = dayData.days[0];
  const formattedDate = formatDateComparison(day.datetimeEpoch);

  return (
    <div className="flex flex-col w-full gap-4 p-2 bg-white shadow-lg sm:p-6 h-fulls rounded-xl">
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="text-lg font-semibold text-gray-700">
          {formattedDate}
        </div>    
        {chartData
          ? getPeriodDescription(chartData)
          : getDescription({
              averageTemp: day.temp,
              averagePrecipitation: day.precipprob,
              averageHumidity: day.humidity,
            })}
      </div>
      <div className="relative flex items-center justify-between w-full p-4 bg-blue-100 shadow-sm rounded-2xl">
        <WeatherCardTemperatureSection day={day} />
        <RightDescriptionSection day={day} />
      </div>
      {chartData ? (
        <div className="h-[300px]">
          <WeatherChart chartData={chartData} period={selectedPeriod.label} />
        </div>
      ) : (
        <div className="w-full text-sm text-center text-gray-500 h-[300px] bg-gray-100 items-center justify-center flex">
          Hourly data not available
        </div>
      )}
    </div>
  );
}
