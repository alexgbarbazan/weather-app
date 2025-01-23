import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { Option } from "../../components/ui/weather-ui/Select";
import { DayOption, PeriodOption, ProcessedPeriods } from "./types";
import { daysOptions, dayPeriods } from "./constants";
import { getInitialStartDate } from "./utils";
import { processWeatherData } from "./utils/process-weather-data";
import { fetchWeatherData } from "./api";

export type WeatherState = {
  selectedDay: DayOption;
  startDate: number;
  selectedLocationDisplay: string;
  selectedLocation: string;
  selectedPeriod: PeriodOption;
  chartData: {
    startData: ProcessedPeriods | undefined;
    endData: ProcessedPeriods | undefined;
  };
};

type WeatherContextType = WeatherState & {
  updateLocation: (location: string) => void;
  updateDayOfTheWeek: (selectedDay: DayOption) => void;
  updatePeriod: (selectedPeriod: Option) => void;
};

export enum WeatherActionType {
  SetSelectedLocationDisplay = "SET_SELECTED_LOCATION_DISPLAY",
  SetSelectedLocation = "SET_SELECTED_LOCATION",
  SetSelectedDay = "SET_SELECTED_DAY",
  SetSelectedPeriod = "SET_SELECTED_PERIOD",
  SetChartData = "SET_CHART_DATA",
}

export type WeatherActionPayloadMap = {
  [WeatherActionType.SetSelectedDay]: DayOption;
  [WeatherActionType.SetSelectedLocationDisplay]: string;
  [WeatherActionType.SetSelectedLocation]: string;
  [WeatherActionType.SetSelectedPeriod]: Option;
  [WeatherActionType.SetChartData]: {
    startData: ProcessedPeriods | undefined;
    endData: ProcessedPeriods | undefined;
  };
};

export type WeatherAction<K extends WeatherActionType = WeatherActionType> =
  K extends keyof WeatherActionPayloadMap
    ? { type: K; payload: WeatherActionPayloadMap[K] }
    : never;

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
    chartData: {
      startData: undefined,
      endData: undefined,
    },
  };
}

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
    case WeatherActionType.SetChartData:
      return { ...state, chartData: action.payload };
    default:
      return state;
  }
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
    }, 1000);
  }

  async function getWeatherData() {
    const { startData, endData } = await fetchWeatherData({
      location: state.selectedLocation,
      startDate: state.startDate,
      endDate: state.startDate + 7 * 3600 * 24,
    });

    if (!startData || !endData) return;

    dispatch({
      type: WeatherActionType.SetChartData,
      payload: {
        startData: processWeatherData(startData.days[0]),
        endData: processWeatherData(endData.days[0]),
      },
    });
  }

  useEffect(() => {
    if (!state.selectedLocation) return;
    getWeatherData();
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
        updatePeriod: (selectedPeriod: Option) => {
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
