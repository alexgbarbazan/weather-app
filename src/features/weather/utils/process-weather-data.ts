import { convertTo12HourFormat } from ".";
import { ProcessedPeriods } from "../types";
import { HourWeatherData } from "../types/weather-api";

/**
 * @description: For each period of the day, we want to associate the hours that belong to that period, 
 * plus add two extra hours to the beginning and end of the period.
 * As an example, the morning period is from 8am to 12pm, so we add 6am and 7am to the beginning of the period, and 1pm and 2pm to the end.
 */
const periodHoursMap: Record<string, Set<number>> = {
  // As per designs: morning: 8am to 12pm, afternoon: 12pm to 5pm, evening: 5pm to 9pm
  morning: new Set([6, 7, 8, 9, 10, 11, 12, 13, 14]), 
  afternoon: new Set([11, 12, 13, 14, 15, 16, 17, 18, 19]),
  evening: new Set([15, 16, 17, 18, 19, 20, 21, 22, 23])
};

function createPeriodWeatherData() {
  return {
    temperatures: [],
    humidity: [],
    precipitation: [],
    hours: [],
  };
}

/**
 * @description: For a given hour of the day, we want to populate the period it's assigned to with temperature, humidity, precipitation, 
 * and include the hour (datetime) itself for the corresponding period.
 */
function populatePeriodData(params: {
  periods: ProcessedPeriods;
  period: keyof ProcessedPeriods;
  hourObj: HourWeatherData;
}) {
  const { periods, period, hourObj } = params;
  const formattedHour = convertTo12HourFormat(hourObj.datetime);

  periods[period].temperatures.push(hourObj.temp);
  periods[period].humidity.push(hourObj.humidity);
  periods[period].precipitation.push(hourObj.precipprob);
  periods[period].hours.push(formattedHour);
}

/**
 * @description: For each hour of the day (IF AVAILABLE), we want to process the weather data and assign it to the corresponding period.
 * NOTE: Per the Visual Crossing documentation, forecast is available for up to 15 days at the hourly summary level, therefore the forecasted weather
 * for a day may not include hourly data.
 */

export function processHourlyWeatherData(hours?: HourWeatherData[]): ProcessedPeriods | undefined {
  if(!hours) return;

  const processedPeriods: ProcessedPeriods = {
    morning: createPeriodWeatherData(),
    afternoon: createPeriodWeatherData(),
    evening: createPeriodWeatherData(),
  };

  hours.forEach((hourObj) => {
    const hour = Number(hourObj.datetime.split(":")[0]);

    Object.keys(periodHoursMap).forEach((period: keyof typeof periodHoursMap) => {
      if (periodHoursMap[period].has(hour)) {
        populatePeriodData({ periods: processedPeriods, period: period as keyof ProcessedPeriods, hourObj });
      }
    });
  });

  return processedPeriods;
}


