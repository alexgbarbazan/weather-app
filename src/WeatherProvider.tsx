import axios from "axios";
import { format } from "date-fns/format";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { Option } from "./components/ui/weather-ui/Select";
import {
  HourWeatherData,
  WeatherAPIResponse,
  WeatherDay,
} from "./types/weather-api";

type DayOption = {
  label: string;
  value: number;
};

type WeatherState = {
  selectedDay: DayOption;
  startDate: number;
  selectedLocationDisplay: string;
  selectedLocation: string;
  selectedPeriod: Option;
};

export const daysOptions: DayOption[] = [
  {
    label: "Sunday",
    value: 0,
  },
  {
    label: "Monday",
    value: 1,
  },
  {
    label: "Tuesday",
    value: 2,
  },
  {
    label: "Wednesday",
    value: 3,
  },
  {
    label: "Thursday",
    value: 4,
  },
  {
    label: "Friday",
    value: 5,
  },
  {
    label: "Saturday",
    value: 6,
  },
];

export const dayPeriods = [
  { label: "Morning (5:00am - 11:59am)", value: "morning" },
  { label: "Afternoon (12:00pm - 5:59pm)", value: "afternoon" },
  { label: "Evening (6:00pm - 11:59pm)", value: "evening" },
];

export enum WeatherActionType {
  SetSelectedLocationDisplay = "SET_SELECTED_LOCATION_DISPLAY",
  SetSelectedLocation = "SET_SELECTED_LOCATION",
  SetSelectedDay = "SET_SELECTED_DAY",
  SetSelectedPeriod = "SET_SELECTED_PERIOD",
}

export type WeatherActionPayloadMap = {
  [WeatherActionType.SetSelectedDay]: DayOption;
  [WeatherActionType.SetSelectedLocationDisplay]: string;
  [WeatherActionType.SetSelectedLocation]: string;
  [WeatherActionType.SetSelectedPeriod]: string;
};

export type WeatherAction<K extends WeatherActionType = WeatherActionType> =
  K extends keyof WeatherActionPayloadMap
    ? { type: K; payload: WeatherActionPayloadMap[K] }
    : never;

function getInitialStartDate(dayOfWeek: number) {
  const day = new Date();
  const diff = dayOfWeek - day.getDay();
  day.setDate(day.getDate() + diff);
  day.setHours(0, 0, 0, 0);
  return day.getTime() / 1000;
}

function updateStartDate(params: {
  startDate: number;
  multiplier: 1 | -1;
  offsetDays: number;
}) {
  const { startDate, multiplier, offsetDays = 7 } = params;

  const newStartDate = new Date(startDate * 1000);
  newStartDate.setDate(newStartDate.getDate() + multiplier * offsetDays);
  newStartDate.setHours(0, 0, 0, 0);
  return newStartDate.getTime() / 1000;
}

function createInitialState(): WeatherState {
  const selectedDay = daysOptions.find(
    (day) => day.value === new Date().getDay()
  )!;
  const startDate = getInitialStartDate(selectedDay.value);

  return {
    selectedDay,
    startDate,
    selectedLocationDisplay: "",
    selectedLocation: "",
    selectedPeriod: dayPeriods[0],
  };
}

type WeatherContextType = WeatherState & {
  updateLocation: (location: string) => void;
  updateDayOfTheWeek: (selectedDay: DayOption) => void;
  updatePeriod: (selectedPeriod: Option) => void;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

function weatherReducer(
  state: WeatherState,
  action: WeatherAction
): WeatherState {
  switch (action.type) {
    case WeatherActionType.SetSelectedDay:
      return { ...state, selectedDay: action.payload };
    case WeatherActionType.SetSelectedLocationDisplay:
      return { ...state, selectedLocationDisplay: action.payload };
    case WeatherActionType.SetSelectedLocation:
      return { ...state, selectedLocation: action.payload };
    case WeatherActionType.SetSelectedPeriod:
      return { ...state, selectedPeriod: action.payload };
    default:
      return state;
  }
}

function getStartOfWeek() {
  const today = new Date(); // Get today's date
  const dayOfWeek = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, etc.)

  // Calculate how many days to subtract to get back to Sunday (start of the week)
  const diff = today.getDate() - dayOfWeek; // Sunday is day 0

  // Set the date to the previous Sunday
  today.setDate(diff);

  // Set the time to midnight to ensure it's the start of the day
  today.setHours(0, 0, 0, 0);

  return today; // Return the date object representing the start of the week (Sunday)
}

async function fetchWeatherDataByDate(
  location: string,
  startDate: number
): Promise<WeatherAPIResponse | undefined> {
  // const apiKey = "ZQRL89WGEUPY47MKQ3A72EURW";
  const apiKey = "JVUB8S2QAF38XNT9KDVTFWEVM";

  const response = await axios.post(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline",
    {
      location: location,
      datestart: startDate,
      key: apiKey,
    }
  );
  return response?.data;
}

async function fetchWeatherData(params: {
  location: string;
  startDate: number;
  endDate: number;
}) {
  const [startData, endData] = await Promise.all([
    fetchWeatherDataByDate(params.location, params.startDate),
    fetchWeatherDataByDate(params.location, params.endDate),
  ]);

  return { startData, endData };
}

type PeriodWeatherData = {
  temperatures: number[];
  humidity: number[];
  probPrecipitation: number[];
  hours: string[];
};

type ProcessedPeriods = {
  earlyMorning: PeriodWeatherData;
  morning: PeriodWeatherData;
  afternoon: PeriodWeatherData;
  evening: PeriodWeatherData;
  // night: PeriodWeatherData;
};

function createPeriodWeatherData() {
  return {
    temperatures: [],
    humidity: [],
    probPrecipitation: [],
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
  periods[period].probPrecipitation.push(hourObj.precipprob);
  periods[period].hours.push(hourObj.datetime);
}

function getPeriodForHour(hour: number): keyof ProcessedPeriods {
  switch (true) {
    case hour < 6:
      return "earlyMorning";
    case hour < 12:
      return "morning";
    case hour < 18:
      return "afternoon";
    default:
      return "evening";
  }
}

function processWeatherData(dayData: WeatherDay) {
  const processedPeriods: ProcessedPeriods = {
    earlyMorning: createPeriodWeatherData(),
    morning: createPeriodWeatherData(),
    afternoon: createPeriodWeatherData(),
    evening: createPeriodWeatherData(),
    // night: createPeriodWeatherData(),
  };

  dayData.hours.forEach((hourObj) => {
    const hour = Number(hourObj.datetime.split(":")[0]);

    const period = getPeriodForHour(hour);

    // Evening hours 6pm - 12am
    populatePeriodData({ periods: processedPeriods, period, hourObj });
  });

  return processedPeriods;
}

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(weatherReducer, createInitialState());

  const searchTermTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  async function updateLocation(value: string) {
    dispatch({
      type: WeatherActionType.SetSelectedLocationDisplay,
      payload: value,
    });

    if (searchTermTimeoutRef.current) {
      clearTimeout(searchTermTimeoutRef.current);
    }

    searchTermTimeoutRef.current = setTimeout(() => {
      dispatch({
        type: WeatherActionType.SetSelectedLocation,
        payload: value,
      });
    }, 300);
  }

  console.log(getInitialStartDate(4));

  async function getWeatherData() {
    const { startData, endData } = await fetchWeatherData({
      location: state.selectedLocation,
      startDate: state.startDate,
      endDate: state.startDate + 7 * 3600 * 24,
    });
    if (!startData || !endData) return;

    const processedStartData = processWeatherData(startData.days[0]);
    const processedEndData = processWeatherData(endData.days[0]);
    console.log(processedStartData);
    console.log(processedEndData);
  }

  useEffect(() => {
    if (!state.selectedLocation) return;
    // const startDate = getStartOfWeek().getTime() / 1000;
    // const endDate = startDate + 14 * 3600 * 24;

    getWeatherData();

    // fetchWeatherData({ location: state.selectedLocation, startDate, endDate});
  }, [state.selectedLocation]);

  return (
    <WeatherContext.Provider
      value={{
        ...state,
        updateLocation,
        updateDayOfTheWeek: (selectedDay: DayOption) => {
          dispatch({
            type: WeatherActionType.SetSelectedDay,
            payload: selectedDay,
          });
        },
        updatePeriod: (selectedPeriod: string) => {
          dispatch({
            type: WeatherActionType.SetSelectedPeriod,
            payload: selectedPeriod,
          });
        },
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeatherContext() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
}
