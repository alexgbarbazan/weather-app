import Select from "./ui/weather-ui/Select";
import { useWeatherContext } from "../features/weather/WeatherProvider";
import Input from "./ui/weather-ui/Input";
import { daysOptions, dayPeriods } from "../features/weather/constants";
import CalendarIcon from "./icons/CalendarIcon";
import LocationIcon from "./icons/LocationIcon";
import ClockIcon from "./icons/ClockIcon";

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
    <div className="flex flex-wrap items-center justify-between max-w-5xl gap-4 p-6 mx-auto bg-white rounded-lg">
      <Input
        value={selectedLocationDisplay}
        handleChange={updateLocation}
        placeholder="Enter location"
        className="!m-0 !max-w-[400px] !w-full"
        icon={<LocationIcon />}
      />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Select
            options={daysOptions}
            selectedOption={selectedDay}
            updateSelection={updateDayOfTheWeek}
            selectTriggerClassName="w-[250px]"
            prefix={
              <div className="flex items-center gap-1 mr-2">
                <CalendarIcon />

                <span>Every:</span>
              </div>
            }
          />
        </div>
        <Select
          options={dayPeriods}
          selectedOption={selectedPeriod}
          updateSelection={updatePeriod}
          selectTriggerClassName="w-[250px]"
          prefix={
            <div className="flex items-center gap-1 mr-2">
              <ClockIcon />
            </div>
          }
        />
      </div>
    </div>
  );
}
