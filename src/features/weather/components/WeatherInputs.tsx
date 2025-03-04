import Select from "../../../components/ui/weather-ui/Select";
import { useWeatherContext } from "../context/WeatherProvider";
import Input from "../../../components/ui/weather-ui/Input";
import { daysOptions, dayPeriods } from "../constants";
import CalendarIcon from "../../../components/icons/CalendarIcon";
import LocationIcon from "../../../components/icons/LocationIcon";
import ClockIcon from "../../../components/icons/ClockIcon";

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
    <div className="flex flex-col items-center justify-between max-w-5xl gap-4 p-6 mx-auto bg-white shadow-sm lg:flex-row rounded-xl">
      <Input
        value={selectedLocationDisplay}
        handleChange={updateLocation}
        placeholder="Enter location"
        className="!m-0 w-full lg:max-w-[400px] lg:w-full"
        icon={<LocationIcon />}
      />
      <div className="flex items-center w-full gap-4">
        <Select
          options={daysOptions}
          selectedOption={selectedDay}
          updateSelection={updateDayOfTheWeek}
          selectTriggerClassName="w-full lg:w-[250px]"
          prefix={
            <div className="flex items-center gap-1 mr-2">
              <CalendarIcon />
              <span>Every:</span>
            </div>
          }
        />
        <Select
          options={dayPeriods}
          selectedOption={selectedPeriod}
          updateSelection={updatePeriod}
          selectTriggerClassName="w-full lg:w-[250px]"
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
