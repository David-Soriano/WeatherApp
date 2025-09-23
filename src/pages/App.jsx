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
function App() {
  const coords = useCurrentLocation() || { latitude: DEFAULT_COORDS.latitude, longitude: DEFAULT_COORDS.longitude };

  const { data, loading, error } = useWeeklyForecast(coords || { latitude: DEFAULT_COORDS.latitude, longitude: DEFAULT_COORDS.longitude });
  const { dataHr: hourly, loadingHr, errorHr } = useHourlyForecast(coords || { latitude: DEFAULT_COORDS.latitude, longitude: DEFAULT_COORDS.longitude });
  const { dataLoc, loadingLoc, errorLoc } = useWeatherWithLocation(coords || { latitude: DEFAULT_COORDS.latitude, longitude: DEFAULT_COORDS.longitude });

  const daysToRender = (loading || loadingLoc)
    ? Array(7).fill(null)
    : data;

  const hoursToRender = (loadingHr || loadingLoc)
    ? Array(8).fill(null)
    : hourly;

  return (
    <>
      <Header />
      <Main>
        {errorLoc && (
          <Error />
        )}
        {!errorLoc && (
          <>
            <Intro />
            <section className="lg:grid lg:grid-cols-[70%_30%] gap-4">
              <section className="flex flex-col">
                <DetailsClimate coords={coords} data={dataLoc} loading={loadingLoc} error={errorLoc} />
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
          </>
        )}
        <Footer />
      </Main>
      
    </>
  );
}

export default App
