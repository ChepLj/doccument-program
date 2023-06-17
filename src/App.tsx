import { Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage } from "./page/MainPage/MainPage";
import { LoginPage } from "./page/LoginPage/LoginPage";
import { CreatePage } from "./page/CreatePage/CreatePage";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<CreatePage />} />

        <Route path="/*" element={<MainPage />} />

      </Routes>
    </div>
  );
}

export default App;
