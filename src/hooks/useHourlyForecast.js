import { useState, useEffect } from "react";
import { fetchHourlyForecast } from "../services/wheatherApi";

export default function useHourlyForecast({ latitude, longitude}) {
    const [dataHr, setData] = useState(null);
    const [loadingHr, setLoading] = useState(false);
    const [errorHr, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        const controller = new AbortController();

        async function load() {
            if(cancelled) return;
            setLoading(true);
            setError(null);

            try{
                const hours = await fetchHourlyForecast({
                    latitude, longitude, signal: controller.signal,
                });
                if(!cancelled) setData(hours);
            } catch (err){
                if(!cancelled && err.name !== "AbortError"){
                    setError(err);
                }
            } finally{
                if(!cancelled) setLoading(false);
            }
        }

        load();

        return () =>{
            cancelled = true;
            controller.abort();
        };
    }, [latitude, longitude]);
    return { dataHr, loadingHr, errorHr };
}