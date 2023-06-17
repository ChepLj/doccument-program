import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { Button, Stack } from "@mui/material";
import {
  ITF_ObjFilter,
  ITF_ObjFilterArray,
  ITF_drawingContent,
  ITF_drawingContentItem,
} from "../../../../interface/interface.ts";
import style from "./ViewPort1.module.css";
import { useEffect } from "react";

export default function ViewPort1({
  rightSideContentData,
  handelDirectViewPort2,
}: {
  rightSideContentData: ITF_drawingContent;
  handelDirectViewPort2: Function;
}) {
  console.log("%cViewPort1 Page mount", "color:green");
  useEffect(() => {
    //: Unmount
    return () => {
      console.log("%cViewPort1 Page Unmount", "color:red");
    };
  }, []);
  //TODO: handle data
  const tempArrayLocal = new Set();
  const resultArray: any[] = [];
  const handleData = () => {
    const objFilter: ITF_ObjFilter = {
      "01": {
        New: [],
        Current: [],
      },
      "02": {
        New: [],
        Current: [],
      },
      "03": {
        New: [],
        Current: [],
      },
      "04": {
        New: [],
        Current: [],
      },
      "05": {
        New: [],
        Current: [],
      },
    };
    for (const key in rightSideContentData) {
      const keyTemp = key as keyof ITF_drawingContent;
      const itemTemp: ITF_drawingContentItem = rightSideContentData[keyTemp];

      switch (itemTemp.localArea?.id) {
        case "01": {
          if (itemTemp.status === "New") {
            objFilter["01"].New.push(keyTemp);
          } else if (itemTemp.status === "Current") {
            objFilter["01"].Current.push(keyTemp);
          }
          objFilter["01"].groupName = itemTemp.localArea.name;
          break;
        }
        case "02": {
          if (itemTemp.status === "New") {
            objFilter["02"].New.push(keyTemp);
          } else if (itemTemp.status === "Current") {
            objFilter["02"].Current.push(keyTemp);
          }
          objFilter["02"].groupName = itemTemp.localArea.name;
          break;
        }
        case "03": {
          if (itemTemp.status === "New") {
            objFilter["03"].New.push(keyTemp);
          } else if (itemTemp.status === "Current") {
            objFilter["03"].Current.push(keyTemp);
          }
          objFilter["03"].groupName = itemTemp.localArea.name;
          break;
        }
        case "04": {
          if (itemTemp.status === "New") {
            objFilter["04"].New.push(keyTemp);
          } else if (itemTemp.status === "Current") {
            objFilter["04"].Current.push(keyTemp);
          }
          objFilter["04"].groupName = itemTemp.localArea.name;
          break;
        }
        case "05": {
          if (itemTemp.status === "New") {
            objFilter["05"].New.push(keyTemp);
          } else if (itemTemp.status === "Current") {
            objFilter["05"].Current.push(keyTemp);
          }
          objFilter["05"].groupName = itemTemp.localArea.name;
          break;
        }
      }
    }
    //: chuyen object sang array de render
    for (const item in objFilter) {
      const keyTemp = item as keyof ITF_ObjFilter;
      const objectTemp = objFilter[keyTemp];

      if (objectTemp.New.length !== 0 || objectTemp.Current.length !== 0) {
        const objTemp = objectTemp;
        objTemp.id = item;
        resultArray.push(objTemp);
      }
    }
    return resultArray;
  };
  const arrayRenderTemp = handleData();

  //TODO_END: handle data

  return (
    <section className={style.mainContainer}>
      <div className={style.group}>
        {arrayRenderTemp.map((motherCrr, motherIndex) => {
          return (
            <div key={motherIndex}>
              <div className={style.titleGroup}>{`${motherCrr.id} - ${motherCrr.groupName}`}</div>
              {motherCrr.New.length > 0 && (
                <NewDrawing
                  motherCrr={motherCrr}
                  rightSideContentData={rightSideContentData}
                  handelDirectViewPort2={handelDirectViewPort2}
                />
              )}
              {motherCrr.Current.length > 0 && (
                <CurrentDrawing
                  motherCrr={motherCrr}
                  rightSideContentData={rightSideContentData}
                  handelDirectViewPort2={handelDirectViewPort2}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

//JSX: New Drawing

function NewDrawing({
  motherCrr,
  rightSideContentData,
  handelDirectViewPort2,
}: {
  motherCrr: ITF_ObjFilterArray;
  rightSideContentData: ITF_drawingContent;
  handelDirectViewPort2: Function;
}) {
  return (
    <ul>
      <span className={style.titleList}>New: (waiting for approve)</span>
      {motherCrr.New.map((groupCrr: string, groupIndex: number) => {
        const keyTemp = groupCrr as keyof ITF_drawingContent;
        const item: ITF_drawingContentItem = rightSideContentData[keyTemp];
        return (
          <li className={style.listItem} key={groupIndex}>
            <div className={style.leftItem}>
              <span className={style.idCode}>{item.idCode}</span>
              <PictureAsPdfIcon fontSize="small" color="error" />
              <a className={style.name} onClick={() => handelDirectViewPort2(groupCrr)}>
                {item.name}
              </a>
            </div>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" startIcon={<DownloadIcon />} size="small">
                Download
              </Button>
              <Button variant="outlined" startIcon={<UpgradeIcon />} size="small" color="warning">
                Update
              </Button>
              <Button variant="outlined" startIcon={<DeleteIcon />} size="small" color="error">
                delete
              </Button>
            </Stack>
          </li>
        );
      })}
    </ul>
  );
}
//JSX_END: New Drawing

//JSX: New Drawing

function CurrentDrawing({
  motherCrr,
  rightSideContentData,
  handelDirectViewPort2,
}: {
  motherCrr: ITF_ObjFilterArray;
  rightSideContentData: ITF_drawingContent;
  handelDirectViewPort2: Function;
}) {
  return (
    <ul>
      <span className={style.titleList}>Current:</span>
      {motherCrr.Current.map((groupCrr: string, groupIndex: number) => {
        const keyTemp = groupCrr as keyof ITF_drawingContent;
        const item: ITF_drawingContentItem = rightSideContentData[keyTemp];
        return (
          <li className={style.listItem} key={groupIndex}>
            <div className={style.leftItem}>
              <span className={style.idCode}>{item.idCode}</span>
              <PictureAsPdfIcon fontSize="small" color="error" />
              <a className={style.name} onClick={() => handelDirectViewPort2(groupCrr)}>
                {item.name}
              </a>
            </div>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" startIcon={<DownloadIcon />} size="small">
                Download
              </Button>
              <Button variant="outlined" startIcon={<UpgradeIcon />} size="small" color="warning">
                Update
              </Button>
              <Button variant="outlined" startIcon={<DeleteIcon />} size="small" color="error" disabled>
                delete
              </Button>
            </Stack>
          </li>
        );
      })}
    </ul>
  );
}
//JSX_END: New Drawing
