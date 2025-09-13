import { useEffect, useState, useMemo } from 'react';
import { fetchWeeklyForecast } from '../services/wheatherApi';
import { getWeekISOFrom } from '../utils/dates';

export default function useWeeklyForecast({
  latitude,
  longitude,
  date,
  refreshIntervalMs = 60 * 60 * 1000 // 1h en ms
}) {
  const [data, setData] = useState(null); // null = aún no cargado
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 👉 evita que `new Date()` cambie en cada render
  const stableDate = useMemo(() => date ?? new Date(), [date]);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      if (cancelled) return;
      setLoading(true);
      setError(null);

      try {
        const week = getWeekISOFrom(stableDate);
        const start = week[0];
        const end = week[6];

        const days = await fetchWeeklyForecast({
          latitude,
          longitude,
          start_date: start,
          end_date: end,
          signal: controller.signal,
          
        });

        if (!cancelled) {
          setData(days);
        }
      } catch (err) {
        if (!cancelled && err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    let intervalId;
    if (refreshIntervalMs && refreshIntervalMs >= 5 * 60 * 1000) {
      // mínimo cada 5 min
      intervalId = setInterval(load, refreshIntervalMs);
    }

    return () => {
      cancelled = true;
      controller.abort();
      if (intervalId) clearInterval(intervalId);
    };
  }, [latitude, longitude, stableDate, refreshIntervalMs]);

  return { data, loading, error };
}