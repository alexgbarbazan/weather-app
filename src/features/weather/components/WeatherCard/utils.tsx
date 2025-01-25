import { WindIcon } from "lucide-react";
import { RainIcon } from "../../../../components/icons/RainIcon";
import SnowIcon from "../../../../components/icons/SnowIcon";
import { WeatherDay } from "../../types/weather-api";
import {format} from "date-fns";
import { PeriodWeatherData } from "../../types";

/**
 * @description Append a prefix to the date based on the comparison with today's date.
 * Additionally displays the year if the date is not in the current year.
 * Example: "Today, Aug. 23" or "Last Week, Aug. 16" or "Next Week, Aug. 30"
 */
export function formatDateComparison(epochTime: number): JSX.Element {
  const inputDate = new Date(epochTime * 1000);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfThisWeek = new Date(today);
  startOfThisWeek.setDate(today.getDate() - today.getDay());
  startOfThisWeek.setHours(0, 0, 0, 0);

  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const startOfNextWeek = new Date(startOfThisWeek.getTime() + oneWeek);
  const startOfLastWeek = new Date(startOfThisWeek.getTime() - oneWeek);

  const inputTimestamp = inputDate.getTime();
  const todayTimestamp = today.getTime();
  const startOfThisWeekTimestamp = startOfThisWeek.getTime();
  const startOfNextWeekTimestamp = startOfNextWeek.getTime();
  const startOfLastWeekTimestamp = startOfLastWeek.getTime();

  let prefix = "";
  if (inputTimestamp === todayTimestamp) {
    prefix = "Today";
  } else if (
    inputTimestamp >= startOfLastWeekTimestamp &&
    inputTimestamp < startOfThisWeekTimestamp
  ) {
    prefix = "Last Week";
  } else if (
    inputTimestamp >= startOfThisWeekTimestamp &&
    inputTimestamp < startOfNextWeekTimestamp
  ) {
    prefix = "This Week";
  } else if (
    inputTimestamp >= startOfNextWeekTimestamp &&
    inputTimestamp < startOfNextWeekTimestamp + oneWeek
  ) {
    prefix = "Next Week";
  }

  const formattedDate = inputDate.toLocaleDateString("en-US");

  const displayDate =
    inputDate.getFullYear() !== today.getFullYear()
      ? `${format(formattedDate, "eeee, MMM. dd yyyy")}`
      : `${format(formattedDate, "eeee, MMM. dd")}`;

  return (
    <p className="mb-1 font-semibold text-gray-600">
      <span className="font-bold text-blue-500">{prefix}</span> {displayDate}
    </p>
  );
}

export function getWindDetail(day: WeatherDay) {
  const windSpeed = Math.floor(day.windspeed);
  const style = { width: "15px", height: "15px" };

  return (
    <div className="flex items-center gap-1 text-xs font-bold">
      <WindIcon style={style} /> winds {windSpeed} mph
    </div>
  );
}

export function getPrecipitationDetail(day: WeatherDay) {
  const probabilityOfPrecipitation = Math.floor(day.precipprob);
  const precipitationType = day.preciptype?.[0];

  if (probabilityOfPrecipitation < 1) {
    return (
      <div className="flex items-center gap-1 text-xs font-bold">
        No precipitation
      </div>
    );
  }

  const style = { width: "15px", height: "15px" };
  const icon =
    precipitationType === "snow" ? (
      <SnowIcon style={style} />
    ) : (
      <RainIcon style={style} />
    );

  const formattedPrecipitationType =
    precipitationType === "rain" || precipitationType === "snow"
      ? precipitationType
      : "precip.";

  return (
    <div className="flex items-center gap-1 text-xs font-bold">
      {icon}
      {probabilityOfPrecipitation}% chance of {formattedPrecipitationType}
    </div>
  );
}

export function getPeriodAverages(chartData: PeriodWeatherData) {
  const calculateAverage = (data: number[]) =>
    data
      .slice(2, data.length - 2)
      .reduce((sum, value) => sum + Math.floor(value), 0) /
    (data.length - 4);

  const averageTemp = calculateAverage(chartData.temperatures);
  const averagePrecipitation = calculateAverage(chartData.precipitation);
  const averageHumidity = calculateAverage(chartData.humidity);

  return {
    averageTemp,
    averagePrecipitation,
    averageHumidity,
  };
}

export function getPeriodDescription(chartData: PeriodWeatherData) {
  const { averageTemp, averagePrecipitation, averageHumidity } =
    getPeriodAverages(chartData);

  return getDescription({
    averageTemp,
    averagePrecipitation,
    averageHumidity,
  });
}

export function getDescription(params: {
  averageTemp: number;
  averagePrecipitation: number;
  averageHumidity: number;
}) {
  const { averageTemp, averagePrecipitation, averageHumidity } = params;

  let tempDescription = "";
  let precipitationDescription = "";
  let humidityDescription = "";

  switch (true) {
    case averageTemp > 75:
      tempDescription = "Hot";
      break;
    case averageTemp > 65:
      tempDescription = "Warm";
      break;
    case averageTemp > 55:
      tempDescription = "Mild";
      break;
    case averageTemp > 45:
      tempDescription = "Cool";
      break;
    default:
      tempDescription = "Cold";
  }

  switch (true) {
    case averagePrecipitation > 50:
      precipitationDescription = "high chance of precipitation";
      break;
    case averagePrecipitation > 25:
      precipitationDescription = "chance of precipitation";
      break;
    default:
      precipitationDescription = "low chance of precipitation";
  }

  switch (true) {
    case averageHumidity > 75:
      humidityDescription = "high humidity";
      break;
    case averageHumidity > 50:
      humidityDescription = "moderate humidity";
      break;
    default:
      humidityDescription = "low humidity";
  }

  return (
    <div className="w-[250px] text-right absolute top-0 right-0 p-1 px-2 shadow-sm bg-neutral-100 rounded-xl">
      <p className="text-xs font-semibold text-gray-700">
        {tempDescription} with a {precipitationDescription} and{" "}
        {humidityDescription}
      </p>
    </div>
  );
}