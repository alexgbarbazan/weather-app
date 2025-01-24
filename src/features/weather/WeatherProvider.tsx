import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { DayOption, PeriodOption, ProcessedPeriods } from "./types";
import { daysOptions, dayPeriods } from "./constants";
import { getInitialStartDate, updateStartDate } from "./utils";
import { processHourlyWeatherData } from "./utils/process-weather-data";
import { fetchWeatherData } from "./api";
import { WeatherAPIResponse } from "./types/weather-api";
import { toast } from "react-toastify";

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

type WeatherContextType = WeatherState & {
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

type WeatherCardData = {
  chartData: ProcessedPeriods | undefined;
  dayData: WeatherAPIResponse | undefined;
}

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
    weatherCards: {
      startData: {
        dayData: undefined,
        chartData: undefined,
      },
      endData: {
        dayData: undefined,
        chartData: undefined,
      }
    },
    weatherDataCache: {},
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
    case WeatherActionType.SetWeatherCards:
      return { ...state, weatherCards: action.payload };
    case WeatherActionType.SetWeatherDataCache:
      return { ...state, weatherDataCache: action.payload };
    case WeatherActionType.SetStartDate:
      return { ...state, startDate: action.payload };
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

      dispatch({
        type: WeatherActionType.SetWeatherDataCache,
        payload: {},
      });
    }, 1000);
  }

  async function getWeatherData() {
    const startDate = state.startDate;
    const endDate = state.startDate + 7 * 3600 * 24;

    if (state.weatherDataCache[startDate] && state.weatherDataCache[endDate]) {
      dispatch({
        type: WeatherActionType.SetWeatherCards,
        payload: {
          startData: state.weatherDataCache[startDate],
          endData: state.weatherDataCache[endDate],
        },
      });
      return;
    }

    try{
      const { startData, endData } = await fetchWeatherData({
        location: state.selectedLocation,
        startDate,
        endDate,
      });

      // console.log(startData?.conditions, endData?.conditions, endData?.icon, startData?.icon)
   
      if (!startData || !endData) return;
  
      const processedStartData = processHourlyWeatherData(startData.days[0]?.hours)
      const processedEndData = processHourlyWeatherData(endData.days[0]?.hours)
  
      console.log({processedStartData, processedEndData})
  
      dispatch({
        type: WeatherActionType.SetWeatherCards,
        payload: {
          startData: {
            dayData: startData,
            chartData: processedStartData,
          },
          endData: {
            dayData: endData,
            chartData: processedEndData,
          }
        },
      });
  
      dispatch({
        type: WeatherActionType.SetWeatherDataCache,
        payload: {
          ...state.weatherDataCache,
          [startDate]: {
            dayData: startData,
            chartData: processedStartData,
          },
          [endDate]: {
            dayData: endData,
            chartData: processedEndData,
          }
        },
      });
    } catch (error: unknown) {
      const err = error as { response: { data: string } };
      console.log(err?.response?.data);
      if(err?.response?.data.includes("Invalid location")) {
        toast.error("Invalid location. Please try a different location");
        return;
      }
      toast.error("Failed to fetch weather data");
    }


  }

  function handleNavigate(multiplier: 1 | -1) {
    const updatedStartDate = updateStartDate({
      startDate: state.startDate,
      multiplier,
    });

    dispatch({
      type: WeatherActionType.SetStartDate,
      payload: updatedStartDate,
    });
  }

  useEffect(() => {
    if (!state.selectedLocation) return;
    getWeatherData();
  }, [state.selectedLocation, state.startDate]);

  
  return (
    <WeatherContext.Provider
      value={{
        ...state,
        updateLocation,
        updateDayOfTheWeek: (selectedDay: DayOption) => {

          const updatedStartDate = getInitialStartDate(selectedDay.value);

          dispatch({
            type: WeatherActionType.SetStartDate,
            payload: updatedStartDate,
          });


          dispatch({
            type: WeatherActionType.SetSelectedDay,
            payload: selectedDay,
          });

          dispatch({
            type: WeatherActionType.SetWeatherDataCache,
            payload: {},
          });
        },
        updatePeriod: (selectedPeriod: PeriodOption) => {
          dispatch({
            type: WeatherActionType.SetSelectedPeriod,
            payload: selectedPeriod,
          });
        },
        handleNavigate,
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
