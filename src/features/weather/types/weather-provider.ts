import { DayOption, PeriodOption, ProcessedPeriods } from ".";
import { WeatherAPIResponse } from "./weather-api";

export type WeatherState = {
  selectedDay: DayOption;
  startDate: number;
  selectedLocationDisplay: string;
  selectedLocation: string;
  selectedPeriod: PeriodOption;
  weatherCards: {
    startData: {
      dayData: WeatherAPIResponse | undefined;
      chartData: ProcessedPeriods | undefined;
    };
    endData: {
      dayData: WeatherAPIResponse | undefined;
      chartData: ProcessedPeriods | undefined;
    };
  };
  weatherDataCache: Record<string, WeatherCardData>;
};

export type WeatherContextType = WeatherState & {
  updateLocation: (location: string) => void;
  updateDayOfTheWeek: (selectedDay: DayOption) => void;
  updatePeriod: (selectedPeriod: PeriodOption) => void;
  handleNavigate: (multiplier: 1 | -1) => void;
};

export enum WeatherActionType {
  SetSelectedLocationDisplay = "SET_SELECTED_LOCATION_DISPLAY",
  SetSelectedLocation = "SET_SELECTED_LOCATION",
  SetSelectedDay = "SET_SELECTED_DAY",
  SetSelectedPeriod = "SET_SELECTED_PERIOD",
  SetWeatherCards = "SET_WEATHER_CARDS",
  SetWeatherDataCache = "SET_WEATHER_DATA_CACHE",
  SetStartDate = "SET_START_DATE",
}

export type WeatherCardData = {
  chartData: ProcessedPeriods | undefined;
  dayData: WeatherAPIResponse | undefined;
};

export type WeatherActionPayloadMap = {
  [WeatherActionType.SetSelectedDay]: DayOption;
  [WeatherActionType.SetSelectedLocationDisplay]: string;
  [WeatherActionType.SetSelectedLocation]: string;
  [WeatherActionType.SetSelectedPeriod]: PeriodOption;
  [WeatherActionType.SetWeatherCards]: {
    startData: WeatherCardData;
    endData: WeatherCardData;
  };
  [WeatherActionType.SetWeatherDataCache]: Record<string, WeatherCardData>;
  [WeatherActionType.SetStartDate]: number;
};

export type WeatherAction<K extends WeatherActionType = WeatherActionType> =
  K extends keyof WeatherActionPayloadMap
    ? { type: K; payload: WeatherActionPayloadMap[K] }
    : never;