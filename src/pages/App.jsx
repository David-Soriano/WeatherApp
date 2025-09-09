import { Header } from "../components/Header/Header.jsx";
import { Main } from "../components/Main/Main.jsx";
import { Intro } from "../components/Intro/Intro.jsx";
import { DetailsClimate } from "../components/DetailsClimate/DetailsClimate.jsx";
function App() {

  return (
    <>
    <Header />
    <Main>
      <Intro />
      <DetailsClimate />
    </Main>
    </>
  );
}

export default App
