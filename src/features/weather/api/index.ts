import axios from "axios";
import { WeatherAPIResponse } from "../types/weather-api";

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

export async function fetchWeatherData(params: {
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
