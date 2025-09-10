import { Header } from "../components/Header/Header.jsx";
import { Main } from "../components/Main/Main.jsx";
import { Intro } from "../components/Intro/Intro.jsx";
import { DetailsClimate } from "../components/DetailsClimate/DetailsClimate.jsx";
import { DetailsForecast } from "../components/DetailsForecast/DetailsForecast.jsx";
import useWeeklyForecast from "../hooks/useWeeklyForecast.js"
import { DEFAULT_COORDS } from "../config/wheatherConfig.js"
import DayCard from '../components/DayCard/DayCard.jsx'
function App() {
  const { data, loading, error } = useWeeklyForecast({ latitude: DEFAULT_COORDS.latitude, longitude: DEFAULT_COORDS.longitude });
  const daysToRender = loading ? Array(7).fill(null) : data;
  return (
    <>
      <Header />
      <Main>
        <Intro />
        <DetailsClimate />
        <DetailsForecast>
          {daysToRender && daysToRender.map((day, i) => (
            <DayCard key={i} day={day} error={error}/>
          ))}
        </DetailsForecast>
      </Main>
    </>
  );
}

export default App
