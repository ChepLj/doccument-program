import AddIcon from "@mui/icons-material/AddToDrive";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { Avatar, Badge, Button, List, ListItem, ListSubheader, Popover, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import handleStringToTime from "../../../component/FCComponent/handleTimeStringToTime";
import logo from "../../../media/image/doccument-Icon.png";
import { AuthContext } from "../../LoginPage/function/loginContext";
import style from "./Header.module.css";

export function Header({ setRefreshState, locationState, dataLogs }: { setRefreshState: Function; locationState: any; dataLogs: any }) {
  const [value, setValue] = useState("DRAWING");
  const { authorLogin } = useContext<any>(AuthContext);
  //: see Mui popover Document
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleLogsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogsClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;
  //////
  let logsBadge = 0;
  let logs = [];
  let waitingForApprove = [];
  if (dataLogs) {
    if (dataLogs.WaitingForApprove) {
      const waitingForApproveTemp = dataLogs.WaitingForApprove;
      for (const key in waitingForApproveTemp) {
        waitingForApprove.push(waitingForApproveTemp[key]);
      }
      logsBadge = Object.keys(waitingForApproveTemp).length;
    }
    ///////
    if (dataLogs.DataLogs) {
      const logsTemp = dataLogs.DataLogs;
      for (const key in logsTemp) {
        logs.push(logsTemp[key]);
      }
    }
  }

  // console.log("🚀 ~ file: Header.tsx:26 ~ Header ~ logsBadge:", logsBadge);
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    window.history.pushState([value], "", "/");
    setRefreshState(Math.random());
  };
  useEffect(() => {
    if (locationState[3] === "direct") {
      const arrayTemp = [locationState[0], locationState[1], locationState[2], locationState[3]];
      setValue(locationState[0]);
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
        <Button variant="contained" size="small" color="success" startIcon={<AddIcon />} onClick={() => window.location.assign("/create")}>
          Create New
        </Button>
        <Badge
          color="secondary"
          badgeContent={logsBadge}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Button className={style.logs} aria-describedby={popoverId} variant="outlined" size="small" color="warning" startIcon={<AssignmentOutlinedIcon />} onClick={handleLogsClick}>
            Logs
          </Button>
        </Badge>

        <Popover
          id={popoverId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleLogsClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Logs waitingForApprove={waitingForApprove} logs={logs} />
        </Popover>

        <Avatar className={style.avatar} src={authorLogin.photoURL}></Avatar>
      </div>
    </header>
  );
}

//JSX: Logs
function Logs({ waitingForApprove, logs }: { waitingForApprove: any[]; logs: any[] }) {
  return (
    <List
      sx={{
        width: "fit-content",
        maxWidth: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 800,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      <li>
        <ul>
          <ListSubheader>Waiting For Approve</ListSubheader>
          {waitingForApprove.reverse().map((crr, index) => {
            return (
              <ListItem key={index}>
                <div className={style.logsItem}>
                  <span className={style.logsIdCode}>{crr.idCode}</span>
                  <a
                    className={style.logsName}
                    onClick={() => {
                      const state = crr.ref;
                      window.history.pushState([...state.split("/"), "direct"], "", "/");
                      window.location.href = "/";
                    }}
                  >
                    {crr.name}
                  </a>
                  <span style={{ fontSize: "10px", fontStyle: "italic", color: "gray", padding: "0 5px" }}>( {crr.author} )</span>
                  <span style={{ fontSize: "10px", fontStyle: "italic", color: "gray" }}>{crr.dateUpdate}</span>
                </div>
              </ListItem>
            );
          })}
        </ul>
      </li>
      <li>
        <ul>
          <ListSubheader>Logs</ListSubheader>
          {logs.reverse().map((crr, index) => {
            return (
              <ListItem key={index}>
                <div className={style.logsItem}>
                  <span className={style.logsLogsAction} style={{ color: "green" }}>
                    {crr.action}
                  </span>
                  <span className={style.logsLogsIdCode}>{crr.idCode}</span>
                  <a className={style.logsLogsName}>{crr.name}</a>
                  <span style={{ fontSize: "10px", fontStyle: "italic", color: "gray", padding: "0 5px" }}>( {crr.author} )</span>
                  <span style={{ fontSize: "10px", fontStyle: "italic", color: "gray" }}>{handleStringToTime("date only", crr?.logsKey)}</span>
                </div>
              </ListItem>
            );
          })}
        </ul>
      </li>
    </List>
  );
}

//JSX_END: Logs
