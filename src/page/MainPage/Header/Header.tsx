import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Avatar, Button, Tab, Tabs } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import logo from "../../../media/image/doccument-Icon.png";
import style from "./Header.module.css";
import { AuthContext } from "../../LoginPage/function/loginContext";

export function Header({ setRefreshState, locationState }: { setRefreshState: Function; locationState: any }) {
  const [value, setValue] = useState("DRAWING");
  const { authorLogin } = useContext<any>(AuthContext);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    window.history.pushState([value], "", "/");
    setRefreshState(Math.random());
  };
  useEffect(() => {
    if (locationState[3] === "direct") {
      const arrayTemp = [locationState[0], locationState[1], locationState[2], locationState[3]];
      setValue(locationState[0])
      window.history.pushState(arrayTemp, "", "/");
    } else {
      window.history.pushState([value], "", "/");
    }
    setRefreshState(Math.random());
  }, [value]);

  return (
    <header className={style.container}>
      <div className={style.leftArea}>
        <img className={style.logo} src={logo} onClick={() => (window.location.href = "/")} />
        <Tabs value={value} onChange={handleChange}>
          <Tab value="DRAWING" label="DRAWING" />
          <Tab value="DOCUMENT" label="DOCUMENT" />
          <Tab value="PROGRAM" label="PROGRAM" />
        </Tabs>
      </div>
      <div className={style.rightArea}>
        <Button variant="contained" size="small" color="success" startIcon={<CloudUploadIcon />} onClick={() => window.location.assign("/create")}>
          Upload
        </Button>
        <Avatar className={style.avatar} src={authorLogin.photoURL}></Avatar>
      </div>
    </header>
  );
}
