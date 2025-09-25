import { Header } from "../components/Header/Header.jsx";
import { Main } from "../components/Main/Main.jsx";
import { Intro } from "../components/Intro/Intro.jsx";
import { DetailsClimate } from "../components/DetailsClimate/DetailsClimate.jsx";
import { DetailsForecast } from "../components/DetailsForecast/DetailsForecast.jsx";
import Footer from "../components/Footer/Footer.jsx";

import useWeeklyForecast from "../hooks/useWeeklyForecast.js"
import { useHourlyForecast, getHoursForDay } from "../hooks/useHourlyForecast.js";
import useWeatherWithLocation from "../hooks/useWeatherWithLocation.js";
import useCurrentLocation from "../hooks/useCurrentLocation.js";

import { DEFAULT_COORDS } from "../config/wheatherConfig.js"
import DayCard from '../components/DayCard/DayCard.jsx'
import { Hourly } from "../components/Hourly/Hourly.jsx";
import { TimeDay } from "../components/TimeDay/TimeDay.jsx";
import Error from "../components/Error/Error.jsx";
import { useEffect, useMemo, useState } from "react";
function App() {
  let ubi = useCurrentLocation();
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [coords, setCoords] = useState(null);

  const [system, setSystem] = useState("metric");
  const [selected, setSelected] = useState(today);

  const defaultUnits = {
    metric: { temp: "celsius", wind: "kmh", precip: "mm" },
    imperial: { temp: "fahrenheit", wind: "mph", precip: "inch" }
  };

  const [unitConfig, setUnitConfig] = useState(defaultUnits);

  // Función para actualizar
  const setUnit = (system, type, value) => {
    setUnitConfig((prev) => ({
      ...prev,
      [system]: {
        ...prev[system],
        [type]: value
      }
    }));
  };

  const toggleSystem = () => {
    setSystem((prev) => {
      const next = prev === "metric" ? "imperial" : "metric";
      setUnitConfig((prev) => ({
        ...prev,
        [next]: defaultUnits[next] // vuelve al default de ese sistema
      }));
      return next;
    });
  };

  const units = unitConfig[system];

  useEffect(() => {
    if (ubi) {
      setCoords(ubi);
    } else if (!ubi && !coords) {
      // si no hay coords todavía, fallback
      setCoords(DEFAULT_COORDS);
    }
  }, [ubi]);

  const { data, loading, error } = useWeeklyForecast({ ...coords, units });
  const { dataHr: hourly, loadingHr, errorHr } = useHourlyForecast({ ...coords, units });
  const { dataLoc, loadingLoc, errorLoc } = useWeatherWithLocation({ ...coords, units });

  function parseHour(timeStr) {
    const match = timeStr.match(/(\d+)\s?(AM|PM)?/i);
    if (!match) return 0;
    let hour = parseInt(match[1], 10);
    const meridian = match[2];

    if (meridian) {
      if (meridian.toUpperCase() === "PM" && hour !== 12) hour += 12;
      if (meridian.toUpperCase() === "AM" && hour === 12) hour = 0;
    }
    return hour;
  }

  const hours = useMemo(() => {
    if (!hourly) return [];

    const filtered = hourly.filter((h) => h.day === selected);
    if (filtered.length === 0) return [];

    if (selected === today) {
      const now = new Date();
      const currentHour = now.getHours();

      const startIndex = filtered.findIndex((h) => parseHour(h.time) >= currentHour);
      const index = startIndex === -1 ? 0 : startIndex;

      return filtered.slice(index, index + 8);
    }

    return filtered.slice(5, 13);
  }, [hourly, selected]);

  console.log(hours)
  const daysToRender = (loading || loadingLoc)
    ? Array(7).fill(null)
    : data;

  const hoursToRender = (loadingHr || loadingLoc)
    ? Array(8).fill(null)
    : hours;

  return (
    <>
      <Header system={system} setSystem={toggleSystem} unitConfig={unitConfig} setUnit={setUnit} />
      <Main>
        {errorLoc && (
          <Error />
        )}
        {!errorLoc && (
          <>
            <Intro setCoords={setCoords} />
            <section className="lg:grid lg:grid-cols-[70%_30%] gap-4">
              <section className="flex flex-col">
                <DetailsClimate coords={coords} data={dataLoc} loading={loadingLoc} error={errorLoc} units={units} />
                <DetailsForecast>
                  {daysToRender && daysToRender.map((day, i) => (
                    <DayCard key={i} day={day} error={error} />
                  ))}
                </DetailsForecast>
              </section>
              <section>
                <Hourly loading={loadingLoc} selected={selected} setSelected={setSelected}>
                  {hoursToRender && hoursToRender.map((hour, i) => (
                    <TimeDay key={i} hour={hour} error={errorHr} />
                  ))}
                </Hourly>
              </section>
            </section>
            <Footer />
          </>
        )}

      </Main>

    </>
  );
}

export default App
