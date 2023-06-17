import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Avatar, Button, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import logo from "../../../media/image/doccument-Icon.png";
import style from "./Header.module.css";

export function Header(prop:any) {
  const [value, setValue] = useState("Drawing");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <header className={style.container}>
      <div className={style.leftArea}>
        <img className={style.logo} src={logo} />
        {/* <Tabs value={value} onChange={handleChange}>
          <Tab value="Drawing" label="Drawing" />
          <Tab value="Document" label="Document" />
          <Tab value="Program" label="Program" />
        </Tabs> */}
      </div>
      <div className={style.rightArea}>
        <Button
          variant="outlined"
          size="small"
          color="warning"
          startIcon={<CloudUploadIcon />}
          onClick={()=>prop?.upLoadAction()}
        >
          Upload To Server
        </Button>
        <Avatar className={style.avatar} >OP</Avatar>
      </div>
    </header>
  );
}
