import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
// import { drawingField, leftSideMainData } from "../../../fakeData/fakeData.ts";

import style from "./LeftSide.module.css";
import { drawingField } from "../../../fakeData/fakeData.ts";
import { ITF_drawing } from "../../../interface/interface.ts";

export function LeftSide({ field, setRightSideContent }: { field: string , setRightSideContent: Function}) {
  const [selectedIndex, setSelectedIndex] = useState("01");
  let lefSideField:ITF_drawing[]  = []

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, rootArea: string , motherArea: string) => {
    setSelectedIndex(`${rootArea}-${motherArea}`);
    setRightSideContent({
      rootArea,
      motherArea,
    })
  };
  switch (field){
    case 'Drawing':{
      lefSideField = drawingField
      break
    }
  }
  return (
    <div className={style.container}>
      {lefSideField.map((crr, index) => {
        return (
          <Accordion  key={index} style={{borderTop: '1px solid #ccc'}}  >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography
                style={{
                  margin: 0,
                }}
              >
                { `(${crr.id}) ${crr.name}`}
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
                {crr.item.map((crrItem, indexItem) => {
                  return (
                    <div key={indexItem}>
                      <ListItemButton
                        selected={selectedIndex === `${crr.id}-${crrItem.id}`}
                        onClick={(event) => handleListItemClick(event, crr.id , crrItem.id)}
                        sx={{bgColor: 'red'}}
                      >
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
