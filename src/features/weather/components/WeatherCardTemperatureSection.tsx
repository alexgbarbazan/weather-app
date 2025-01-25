import Cloudy from "../../../components/icons/Cloudy";
import Overcast from "../../../components/icons/Overcast";
import PartlyCloudy from "../../../components/icons/PartlyCloudy";
import Clear from "../../../components/icons/Clear";
import Snow from "../../../components/icons/Snow";
import Rain from "../../../components/icons/Rain";
import { WeatherDay } from "../types/weather-api";

function processWeatherConditions(conditions: string): JSX.Element {
  const conditionArray = conditions
    .split(",")
    .map((condition) => condition.trim());

  const style = { width: "50px", height: "50px" };
  const weatherConditions = new Map([
    ["Snow", <Snow style={style} />],
    ["Rain", <Rain style={style} />],
    ["Cloudy", <Cloudy style={style} />],
    ["Partially cloudy", <PartlyCloudy style={style} />],
    ["Overcast", <Overcast style={style} />],
    ["Clear", <Clear style={style} />],
  ]);

  // Find first matching condition
  for (const [condition, Component] of weatherConditions) {
    if (conditionArray.includes(condition)) {
      return Component;
    }
  }

  return <></>;
}

export default function WeatherCardTemperatureSection({ day }: { day: WeatherDay }) {
  return (
      <div className="flex flex-col">
        <div className="flex w-[110px] relative">
          <div className="text-4xl font-bold text-blue-500">{Math.floor(day.temp)}°</div>
          <div className="absolute right-[0px] -top-[5px]">
            {processWeatherConditions(day.conditions)}
          </div>
        </div>
        <div className="flex gap-2 text-gray-600">
          <div>
            <p className="font-semibold text-gray-500 text-md">
              <span className="text-xl font-bold text-red-500">H:</span>{" "}
              {day.tempmax}°
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-500 text-md">
              <span className="text-xl font-bold text-blue-700">L:</span>{" "}
              {day.tempmin}°
            </p>
          </div>
        </div>
      </div>
  );
}

