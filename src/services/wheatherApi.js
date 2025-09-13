import { OPEN_METEO_BASE, DEFAULT_TIMEZONE } from "../config/wheatherConfig";

function construirPronostico({
    latitude,
    longitude,
    start_date,
    end_date,
    daily = null,
    hourly = null,
    timezone = DEFAULT_TIMEZONE,
}) {
    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        timezone,
    });

    if (daily) {
        params.set("daily", daily.join(","));
    }

    if (hourly) {
        params.set("hourly", hourly.join(","));
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
export async function fetchWeeklyForecast({ latitude, longitude, start_date, end_date, signal }) {
    const url = construirPronostico({ latitude, longitude, start_date, end_date, daily: ["temperature_2m_min", "temperature_2m_max", "weathercode"], });

    const res = await fetch(url, { signal });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Open-Meteo error: ${res.status} ${text}`)
    }

    const json = await res.json();
    const days = transformarDailyToArray(json.daily);
    return days;
}

export async function fetchHourlyForecast({ latitude, longitude, signal }) {
    const url = construirPronostico({ latitude, longitude, hourly: ["temperature_2m", "weathercode"] });
    ("Temp. Por Dia", url);
    const res = await fetch(url, { signal });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Open-Meteo error: ${res.status} ${text}`);
    }

    const json = await res.json();
    const hours = transformarHourlyToArray(json.hourly);
    return hours;
}