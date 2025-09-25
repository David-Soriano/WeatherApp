
import { OPEN_METEO_BASE, DEFAULT_TIMEZONE, UNITS } from "../config/wheatherConfig";

function construirPronostico({
    latitude,
    longitude,
    start_date,
    end_date,
    daily = null,
    hourly = null,
    current = null,
    timezone = DEFAULT_TIMEZONE,
    temperature_unit = "celsius",
    windspeed_unit = "kmh",
    precipitation_unit = "mm",
}) {
    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        timezone,
        temperature_unit,    // 👈 van por separado
        windspeed_unit,
        precipitation_unit,
    });

    if (daily) {
        params.set("daily", daily.join(","));
    }

    if (hourly) {
        params.set("hourly", hourly.join(","));
    }

    if (current) {
        params.set("current", current.join(","));
    }

    if (start_date) params.set("start_date", start_date);
    if (end_date) params.set("end_date", end_date);

    return `${OPEN_METEO_BASE}?${params.toString()}`;
}



function transformarDailyToArray(daily) {
    if (!daily || !daily.time) return [];
    return daily.time.map((date, i) => ({
        date,
        max: daily.temperature_2m_max?.[i] ?? null,
        min: daily.temperature_2m_min?.[i] ?? null,
        code: daily.weathercode?.[i] ?? null
    }))
}

function transformarHourlyToArray(hourly) {
    if (!hourly || !hourly.time) return [];

    const now = new Date();

    const startIndex = hourly.time.findIndex((t) => new Date(t) > + now);

    const index = startIndex === -1 ? 0 : startIndex;


    return hourly.time.slice(index, index + 8).map((time, i) => {
        const date = new Date(time);
        const formattedHour = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
        });

        return {
            time: formattedHour,
            temp: hourly.temperature_2m?.[index + i] ?? null,
            code: hourly.weathercode?.[index + 1] ?? null,
        }
    });
}
export async function fetchWeeklyForecast({ latitude, longitude, start_date, end_date, signal, units }) {
    
    const url = construirPronostico({ latitude, longitude, start_date, end_date, daily: ["temperature_2m_min", "temperature_2m_max", "weathercode"], temperature_unit: units.temp });

    const res = await fetch(url, { signal });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Open-Meteo error: ${res.status} ${text}`)
    }

    const json = await res.json();

    const days = transformarDailyToArray(json.daily);
    return days;
}

export async function fetchHourlyForecast({ latitude, longitude, signal, units }) {

  const url = construirPronostico({
    latitude,
    longitude,
    hourly: ["temperature_2m", "weathercode"],
    temperature_unit: units.temp === "fahrenheit" ? "fahrenheit" : "celsius",
  });

  const res = await fetch(url, { signal });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Open-Meteo error: ${res.status} ${text}`);
  }

  const json = await res.json();

  return transformarHourlyToArray(json.hourly);
}


export async function fetchLocationName({ latitude, longitude }) {
    const url = `http://localhost/weatherBack/Proxy/proxy.php?lat=${latitude}&lon=${longitude}`;
    const res = await fetch(url);

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Geocoding error: ${res.status} ${text}`);
    }

    const json = await res.json();


    return {
        city: json.address.municipality || json.address.city || json.address.town || "",
        country: json.address.country || "",
    }

}

export async function fetchCurrentWeather({ latitude, longitude, signal, units }) {

    const url = construirPronostico({
        latitude,
        longitude,
        current: ["temperature_2m", "weathercode", "apparent_temperature", "relative_humidity_2m", "wind_speed_10m", "precipitation"],
        temperature_unit: units.temp,
        windspeed_unit: units.wind,
        precipitation_unit: units.precip,
    });
    const res = await fetch(url, { signal });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Weather error: ${res.status} ${text}`);
    }

    const json = await res.json();
    return {
        temperature: json.current?.temperature_2m ?? null,
        code: json.current?.weathercode ?? null,
        sensation: json.current?.apparent_temperature ?? null,
        humidity: json.current?.relative_humidity_2m ?? null,
        wind: json.current?.wind_speed_10m ?? null,
        precipitation: json.current?.precipitation ?? null
    };
}

export async function fetchCity(query) {
    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
    );
    if (!res.ok) throw new Error("Error buscando ciudad");
    return res.json();
}
