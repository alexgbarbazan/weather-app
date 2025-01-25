import Legend from "../features/weather/components/Legend";
import { WeatherCardsContainer } from "../features/weather/components/WeatherCardsContainer";
import WeatherHeader from "../features/weather/components/WeatherHeader";
import WeatherInputs from "../features/weather/components/WeatherInputs";
import WeatherLocation from "../features/weather/components/WeatherLocation";
import { WeatherProvider } from "../features/weather/context/WeatherProvider";

export default function WeatherMain() {
  return (
    <WeatherProvider>
      <div
        className="w-full min-h-screen"
        style={{
          background: "linear-gradient(to top, #ffff, #165885)",
        }}
      >
        <WeatherHeader />
        <div className="flex flex-col items-center px-6 pb-6">
          <div className="flex flex-col w-full max-w-5xl gap-8">
            <div className="w-full pt-8">
              <WeatherInputs />
            </div>
            <WeatherLocation />
            <div className="sm:hidden">
              <Legend />
            </div>
            <WeatherCardsContainer />
            <div className="hidden sm:block">
              <Legend />
            </div>
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
}
