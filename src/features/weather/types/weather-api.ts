// Docs: https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/

type WeatherData = {
  cloudcover: number;
  dateTime: string;
  datetimeEpoch: number;
  temp: number;
  tempmax: number;
  tempmin: number;
  conditions: string;
  precipprob: number; //(forecast only) – the likelihood of measurable precipitation ranging from 0% to 100%
  humidity: number; //the relative humidity as a percentage
  preciptype: ("rain" | "snow" | "freezingrain" | "ice")[]; //an array indicating the type(s) of precipitation expected or that occurred. Possible values include rain, snow, freezingrain and ice;
  snow: number; // the amount of snow that fell or is predicted to fall
  icon: string; //a string representing the weather icon for the conditions
};

export type HourWeatherData = WeatherData & {
  datetime: string;
  datetimeEpoch: number;
};

export type WeatherDay = WeatherData & {
    datetime: string;
    datetimeEpoch: number;
    hours?: HourWeatherData[];
};

export type WeatherAPIResponse = {
    resolvedAddress: string;
    description: string;
    conditions: string;
    days: WeatherDay[];
    currentConditions: WeatherData; 
}