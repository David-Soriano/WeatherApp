import { OPEN_METEO_BASE, DEFAULT_TIMEZONE } from "../config/wheatherConfig";

function construirPronostico({ latitude, longitude, start_date, end_date, daily = ['temperature_2m_min', 'temperature_2m_max', 'weathercode'], timezone = DEFAULT_TIMEZONE }){
    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        daily: daily.join(','),
        timezone
    });
    if(start_date) params.set('start_date', start_date);
    if(end_date) params.set('end_date', end_date);
    return `${OPEN_METEO_BASE}?${params.toString()}`;
}

function transformarDailyToArray(daily){
    if(!daily || !daily.time) return [];
    console.log("Daily recibido:", daily);
    return daily.time.map((date, i) => ({
        date,
        max: daily.temperature_2m_max?.[i] ?? null,
        min: daily.temperature_2m_min?.[i] ?? null,
        code: daily.weathercode?.[i] ?? null
    }))
}

export async function fetchWeeklyForecast({ latitude, longitude, start_date, end_date, signal }){
    const url = construirPronostico({ latitude, longitude, start_date, end_date });
    console.log(url)
    const res = await fetch(url, { signal });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Open-Meteo error: ${res.status} ${text}`)
    }

    const json = await res.json();
    const days = transformarDailyToArray(json.daily);
    return days;
}