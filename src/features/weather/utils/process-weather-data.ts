import { ProcessedPeriods } from "../types";
import { HourWeatherData, WeatherDay } from "../types/weather-api";

function createPeriodWeatherData() {
  return {
    temperatures: [],
    humidity: [],
    precipitation: [],
    hours: [],
  };
}

function populatePeriodData(params: {
  periods: ProcessedPeriods;
  period: keyof ProcessedPeriods;
  hourObj: HourWeatherData;
}) {
  const { periods, period, hourObj } = params;

  periods[period].temperatures.push(hourObj.temp);
  periods[period].humidity.push(hourObj.humidity);
  periods[period].precipitation.push(hourObj.precipprob);
  periods[period].hours.push(hourObj.datetime);
}

function getPeriodForHour(hour: number): keyof ProcessedPeriods | undefined {
  if (hour >= 8 && hour < 12) {
    return "morning";
  }

  if (hour >= 12 && hour < 18) {
    return "afternoon";
  }

  if (hour >= 18 && hour < 21) {
    return "evening";
  }
}

export function processWeatherData(dayData: WeatherDay) {
  const processedPeriods: ProcessedPeriods = {
    morning: createPeriodWeatherData(),
    afternoon: createPeriodWeatherData(),
    evening: createPeriodWeatherData(),
  };

  dayData.hours.forEach((hourObj) => {
    const hour = Number(hourObj.datetime.split(":")[0]);

    const period = getPeriodForHour(hour);
    if (period) {
      populatePeriodData({ periods: processedPeriods, period, hourObj });
    }
  });

  return processedPeriods;
}
