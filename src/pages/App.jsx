import { Header } from "../components/Header/Header.jsx";
import { Main } from "../components/Main/Main.jsx";
import { Intro } from "../components/Intro/Intro.jsx";
import { DetailsClimate } from "../components/DetailsClimate/DetailsClimate.jsx";
import { DetailsForecast } from "../components/DetailsForecast/DetailsForecast.jsx";
import Footer from "../components/Footer/Footer.jsx";

import useWeeklyForecast from "../hooks/useWeeklyForecast.js"
import useHourlyForecast from "../hooks/useHourlyForecast.js";
import useWeatherWithLocation from "../hooks/useWeatherWithLocation.js";
import useCurrentLocation from "../hooks/useCurrentLocation.js";

import { DEFAULT_COORDS } from "../config/wheatherConfig.js"
import DayCard from '../components/DayCard/DayCard.jsx'
import { Hourly } from "../components/Hourly/Hourly.jsx";
import { TimeDay } from "../components/TimeDay/TimeDay.jsx";
import Error from "../components/Error/Error.jsx";
import { useEffect, useState } from "react";
function App() {
  let ubi = useCurrentLocation();
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  // Estado global: "metric" | "imperial"
  const [system, setSystem] = useState("metric");
  const [tempUnit, setTempUnit] = useState("C");
  const [windUnit, setWindUnit] = useState("km");
  const [precipUnit, setPrecipUnit] = useState("mm");

  const [unitConfig, setUnitConfig] = useState({
    metric: { temp: "C", wind: "km", precip: "mm" },
    imperial: { temp: "F", wind: "mph", precip: "in" }
  });

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

  const units = unitConfig[system];

  useEffect(() => {
    if (ubi) {
      setCoords(ubi);
    }
  }, [ubi]);

  const { data, loading, error } = useWeeklyForecast({ ...coords, system });
  const { dataHr: hourly, loadingHr, errorHr } = useHourlyForecast({ ...coords, system });
  const { dataLoc, loadingLoc, errorLoc } = useWeatherWithLocation({ ...coords, system });

  const daysToRender = (loading || loadingLoc)
    ? Array(7).fill(null)
    : data;

  const hoursToRender = (loadingHr || loadingLoc)
    ? Array(8).fill(null)
    : hourly;

  return (
    <>
      <Header system={system} setSystem={setSystem} unitConfig={unitConfig} setUnit={setUnit}/>
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
                <Hourly loading={loadingLoc}>
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
