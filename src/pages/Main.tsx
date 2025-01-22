import WeatherInputs from "../components/WeatherInputs";
import { WeatherProvider } from "../WeatherProvider";

export default function Main(){
    return(
        <WeatherProvider>
            <WeatherInputs />
        </WeatherProvider>
    )
}