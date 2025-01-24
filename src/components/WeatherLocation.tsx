import { useWeatherContext } from "../features/weather/WeatherProvider";

export default function WeatherLocation() {
  const {
    weatherCards,
  } = useWeatherContext();

  const resolvedAddress = weatherCards.startData?.dayData?.resolvedAddress;

  return (
    <>
      {resolvedAddress && (
        <h1 className="text-2xl font-bold text-blue-500">
          Weather for: <span className="text-gray-600">{resolvedAddress} </span>
        </h1>
      )}
    </>
  );
}
