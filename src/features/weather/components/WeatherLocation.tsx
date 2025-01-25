import { useWeatherContext } from "../context/WeatherProvider";

export default function WeatherLocation() {
  const { weatherCards } = useWeatherContext();

  const resolvedAddress = weatherCards.startData?.dayData?.resolvedAddress;

  return (
    <>
      {resolvedAddress && (
        <h1 className="p-4 text-2xl font-bold text-blue-500 bg-white shadow-lg rounded-xl">
          Weather for: <span className="text-gray-600">{resolvedAddress} </span>
        </h1>
      )}
    </>
  );
}
