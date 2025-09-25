import { useEffect, useState } from "react";
import { fetchLocationName } from "../services/wheatherApi";
import { fetchCurrentWeather } from "../services/wheatherApi";

export default function useWeatherWithLocation({ latitude, longitude, system }) {
    const [dataLoc, setData] = useState(null);
    const [loadingLoc, setLoading] = useState(false);
    const [errorLoc, setError] = useState(null);
    
    useEffect(() => {
        if (!latitude || !longitude) return;
        async function load() {
            setLoading(true);
            setError(null);

            try {
                const [weather, location] = await Promise.all([
                    fetchCurrentWeather({ latitude, longitude, system }),
                    fetchLocationName({ latitude, longitude })
                ]);
                
                setData({
                    city: location.city,
                    country: location.country,
                    temperature: weather.temperature,
                    code: weather.code,
                    sensation: weather.sensation,
                    humidity: weather.humidity,
                    wind: weather.wind,
                    precipitation: weather.precipitation
                })
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        load();
    }, [latitude, longitude, system]);
    return { dataLoc, loadingLoc, errorLoc }
}