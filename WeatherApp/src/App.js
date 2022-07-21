import { Calendar } from "react-date-range";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Weather from "./components/Weather"
import SelectDate from "./components/SelectDate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Weather />}></Route>
        <Route path ="/date" element={<SelectDate/>}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
