export type DayOption = {
  label: string;
  value: number;
};

export type PeriodOption = {
  label: string;
  value: keyof ProcessedPeriods;
};

export type PeriodWeatherData = {
  temperatures: number[];
  humidity: number[];
  precipitation: number[];
  hours: string[];
};

export type ProcessedPeriods = {
  morning: PeriodWeatherData;
  afternoon: PeriodWeatherData;
  evening: PeriodWeatherData;
};

export enum ChartColorScheme {
  Temperature = "#F97316",
  Humidity = "#14B8A6",
  Precipitation = "#3B82F6",
}