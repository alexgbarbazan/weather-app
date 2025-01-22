import React, { useState } from "react";

interface WeatherData {
  address: string;
  temperature: number;
  description: string;
}


const daysOptions = [
  {
    label: "Sunday",
    value: 0,
  },
  {
    label: "Monday",
    value: 1,
  },
  {
    label: "Tuesday",
    value: 2,
  },
  {
    label: "Wednesday",
    value: 3,
  },
  {
    label: "Thursday",
    value: 4,
  },
  {
    label: "Friday",
    value: 5,
  },
  {
    label: "Saturday",
    value: 6,
  },
];

const DayDropdown: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay()); // Set default to the current day

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(Number(event.target.value)); // Update selected day
  };

  return (
    <div
      style={{
        maxWidth: "300px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <label
        htmlFor="day-select"
        style={{ display: "block", marginBottom: "10px" }}
      >
        Select Active Day:
      </label>
      <select
        id="day-select"
        value={selectedDay}
        onChange={handleChange}
        style={{
          padding: "8px",
          width: "100%",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {daysOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p style={{ marginTop: "10px" }}>
        Selected Day:{" "}
        {daysOptions.find((day) => day.value === selectedDay)?.label}
      </p>
    </div>
  );
};


const WeatherFetcher: React.FC = () => {
  const [address, setAddress] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "ZQRL89WGEUPY47MKQ3A72EURW"; // Replace with your API key

  const fetchWeather = async () => {
    if (!address) {
      setError("Please enter a valid address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}/1737513660/${
          1737513660 + 14 * 3600 * 24
        }?key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(
          "Unable to fetch weather data. Check the address or try again."
        );
      }

      const data = await response.json();

      setWeatherData({
        address: data.resolvedAddress || address,
        temperature: data.currentConditions.temp,
        description: data.currentConditions.conditions,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Weather Finder</h1>
      <DayDropdown />
      <div>
        <label>
          Enter Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ margin: "10px 0", padding: "8px", width: "100%" }}
            placeholder="e.g., New York, NY"
          />
        </label>
      </div>
      <button
        onClick={fetchWeather}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#ccc" : "#007BFF",
          color: "#fff",
          padding: "10px 15px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: "20px",
        }}
      >
        {loading ? "Loading..." : "Fetch Weather"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <h2>Weather for {weatherData.address}</h2>
          <p>
            <strong>Temperature:</strong> {weatherData.temperature}°C
          </p>
          <p>
            <strong>Condition:</strong> {weatherData.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherFetcher;
