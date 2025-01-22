import Select from "./ui/weather-ui/Select";
import { dayPeriods, daysOptions, useWeatherContext } from "../WeatherProvider";
import Input from "./ui/weather-ui/Input";

export default function WeatherInputs() {
  const {
    selectedLocationDisplay,
    selectedDay,
    selectedPeriod,
    updateDayOfTheWeek,
    updateLocation,
    updatePeriod,
  } = useWeatherContext();

  return (
    <div className="flex items-center justify-between w-full p-4 ">
      <Input
        label="Location"
        value={selectedLocationDisplay}
        handleChange={updateLocation}
        placeholder="Enter location"
      />
      <div className="w-[150px]">
        <Select
          options={dayPeriods}
          selectedOption={selectedPeriod}
          updateSelection={updatePeriod}
        />
      </div>
      <div className="w-[150px]">
        <Select
          options={daysOptions}
          selectedOption={selectedDay}
          updateSelection={updateDayOfTheWeek}
        />
      </div>
    </div>
  );
}
