import { Header } from "../components/Header/Header.jsx";
import { Main } from "../components/Main/Main.jsx";
import { Intro } from "../components/Intro/Intro.jsx";
import { DetailsClimate } from "../components/DetailsClimate/DetailsClimate.jsx";
import { DetailsForecast } from "../components/DetailsForecast/DetailsForecast.jsx";
import useWeeklyForecast from "../hooks/useWeeklyForecast.js"
import useHourlyForecast from "../hooks/useHourlyForecast.js";
import { DEFAULT_COORDS } from "../config/wheatherConfig.js"
import DayCard from '../components/DayCard/DayCard.jsx'
import { Hourly } from "../components/Hourly/Hourly.jsx";
import { TimeDay } from "../components/TimeDay/TimeDay.jsx";
function App() {
  const { data, loading, error } = useWeeklyForecast({ latitude: DEFAULT_COORDS.latitude, longitude: DEFAULT_COORDS.longitude });
  const { dataHr: hourly, loadingHr, errorHr } = useHourlyForecast({ latitude: DEFAULT_COORDS.latitude, longitude: DEFAULT_COORDS.longitude })
  const daysToRender = loading ? Array(7).fill(null) : data;
  const hoursToRender = loadingHr ? Array(8).fill(null) : hourly;

  return (
    <>
      <Header />
      <Main>
        <Intro />
        <DetailsClimate />
        <DetailsForecast>
          {daysToRender && daysToRender.map((day, i) => (
            <DayCard key={i} day={day} error={error} />
          ))}
        </DetailsForecast>
        <Hourly>
          {hoursToRender && hoursToRender.map((hour, i) => (
            <TimeDay key={i} hour={hour} error={errorHr} />
          ))}
        </Hourly>
      </Main>
    </>
  );
}

export default App
