import WeatherIOLogo from "../../../components/icons/WeatherIOLogo";

export default function WeatherHeader() {
  return (
    <header className="gap-2 p-4 bg-white shadow-sm">
      <div className="flex items-center w-full max-w-5xl gap-2 mx-auto">
        <WeatherIOLogo />
        <h1 className="text-xl font-bold text-gray-800">WEATHER.IO</h1>
      </div>
    </header>
  );
}
