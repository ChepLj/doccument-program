import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Divider, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";

import getDataFromDB from "../../../api/getDataFromDB.ts";
import { ITF_drawing } from "../../../interface/interface.ts";
import style from "./LeftSide.module.css";

export function LeftSide({ locationState, setRefreshState }: { locationState: string; setRefreshState: Function }) {
  const [leftSideField, setLeftSideField] = useState<ITF_drawing[]>([]);

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, areaField: string, localField: string) => {
    window.history.pushState([locationState[0], areaField, localField], "", "/");
    setRefreshState(Math.random());
  };
  useEffect(() => {
    switch (locationState[0]) {
      case "DRAWING": {
        const ref = "DRAWING/FIELD/";
        const callback = (result: any) => {
          if (result.type === "SUCCESSFUL") {
            setLeftSideField(result.payload);
          } else {
            setLeftSideField([]);
          }
        };
        getDataFromDB(ref, callback);
        break;
      }

      case "DOCUMENT": {
        const ref = "DOCUMENT/FIELD/";
        const callback = (result: any) => {
          if (result.type === "SUCCESSFUL") {
            setLeftSideField(result.payload);
          } else {
            setLeftSideField([]);
          }
        };
        getDataFromDB(ref, callback);
        break;
      }
      case "PROGRAM": {
        const ref = "PROGRAM/FIELD/";
        const callback = (result: any) => {
          if (result.type === "SUCCESSFUL") {
            setLeftSideField(result.payload);
          } else {
            setLeftSideField([]);
          }
        };
        getDataFromDB(ref, callback);
        break;
      }
    }
  }, [locationState[0]]);
//TODO: expand Accordion
  const [expanded, setExpanded] = useState<string | false>();

  const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {
    setExpanded(locationState[1] ? locationState[1] : false);
  }, []);
//TODO_END: expand Accordion

  return (
    <div className={style.container}>
      {leftSideField.map((crr, index) => {
        return (
          <Accordion key={index} style={{ borderTop: "1px solid #ccc"}} onChange={handleChange(crr.id)} expanded={expanded === crr.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography
                style={{
                  margin: 0,
                  fontWeight:500 
                }}
                
              >
                {`(${crr.id}) ${crr.name}`}
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails
              sx={{
                p: 0,
                pl: 2,
                pr: 2,
                bgcolor: "rgb(232, 236, 240)",
              }}
            >
              <List component="nav" aria-label="main mailbox folders">
                {crr.item?.map((crrItem, indexItem) => {
                  return (
                    <div key={indexItem}>
                      <ListItemButton selected={`${locationState[1]}-${locationState[2]}` === `${crr.id}-${crrItem.id}`} onClick={(event) => handleListItemClick(event, crr.id, crrItem.id)}>
                        <ListItemText primary={`(${crrItem.id}) ${crrItem.name}`} />
                      </ListItemButton>
                      <Divider />
                    </div>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
