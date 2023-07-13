import { Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage } from "./page/MainPage/MainPage";
import LoginPage from "./page/LoginPage/LoginPage";
import { CreatePage } from "./page/CreatePage/CreatePage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./page/LoginPage/function/loginContext";
import { decryptCrypto } from "./component/FCComponent/crypto";

function App() {
  
  const { authorLogin, setAuthorLogin } = useContext<any>(AuthContext);
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    const authorTemp = sessionStorage.getItem("authorLogin");
    if (authorTemp) {
      setAuthorLogin(decryptCrypto(authorTemp));
    }
    setDisplay(true) //: chống giật trang
  }, []);
  return (
    <div className="App">
      {display && (
        <Routes>
          {!authorLogin && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/*" element={<LoginPage />} />
            </>
          )}
          {authorLogin && (
            <>
              <Route path="/" element={<MainPage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/*" element={<MainPage />} />
            </>
          )}
        </Routes>
      )

    }
    </div>
  );
}

export default App;
