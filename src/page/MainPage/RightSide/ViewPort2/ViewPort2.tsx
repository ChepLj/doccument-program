import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import DownloadIcon from "@mui/icons-material/Download";
import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import downloadFileFromStorage from "../../../../api/downloadFileFromStorage";
import { ITF_drawingContent, ITF_drawingContentItem } from "../../../../interface/interface";
import style from "./ViewPort2.module.css";
import { fileOpen } from 'browser-fs-access';
import { ModalImageShow } from "./ModalImageShow";

export default function ViewPort2({
  idCodeWithVersion,
  rightSideContentData4VP2,
  handleBackToViewPort1,
  handelDirectViewPort2,
  setModalImageOpen
}: {
  idCodeWithVersion: { key: string; keyChild: string };
  rightSideContentData4VP2: ITF_drawingContent;
  handleBackToViewPort1: Function;
  handelDirectViewPort2: Function;
  setModalImageOpen:Function
}) {
  ///////////////
  console.log("%cViewPort2 Page mount", "color:green");
  useEffect(() => {
    //: Unmount
    return () => {
      console.log("%cViewPort2 Page Unmount", "color:red");
    };
  }, []);
  /////////////////////
  // const keyTemp = idCodeWithVersion as keyof ITF_drawingContent;
  // const objMain: ITF_drawingContentItem = rightSideContentData[keyTemp];
  const key = idCodeWithVersion.key as keyof ITF_drawingContent;
  const keyChild = idCodeWithVersion.keyChild as keyof ITF_drawingContent;
  const objMain: ITF_drawingContentItem = rightSideContentData4VP2[keyChild];
  console.log("🚀 ~ file: ViewPort2.tsx:35 ~ objMain:", objMain);
  const idCode = objMain?.idCode;


  return (
    <section className={style.mainContainer}>
      <header className={style.header}>
        <div className={style.leftHeader}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosIcon />}
            size="small"
            onClick={() => handleBackToViewPort1()}
          >
            Back
          </Button>
          <div
            className={style.leftHeaderText}
          >{`${objMain?.groupStyle?.name}/ (${objMain?.areaField?.id})${objMain?.areaField?.name}/ (${objMain?.localField?.id})${objMain?.localField?.name}/ (${objMain?.groupField?.id})${objMain?.groupField?.name}`}</div>
        </div>
      </header>
      <section className={style.contentContainer}>
        <LeftSide objMain={objMain} setModalImageOpen={setModalImageOpen}/>

        <RightSide
          idCode={idCode}
          idCodeWithVersion={idCodeWithVersion}
          rightSideContentData4VP2={rightSideContentData4VP2}
          handelDirectViewPort2={handelDirectViewPort2}
        />
      </section>
      
    </section>
  );
}

//JSX: Left side component
function LeftSide({ objMain, setModalImageOpen }: { objMain: ITF_drawingContentItem,setModalImageOpen:Function }) {
  const [showCircularProgress, setShowCircularProgress] = useState("block");

  //TODO: circular Progress
  useEffect(() => {
    setShowCircularProgress("block");
    const circularProgress = setTimeout(() => {
      setShowCircularProgress("none");
    }, 500);
    return () => {
      clearTimeout(circularProgress);
    };
  }, [objMain]);
  //TODO_END: circular Progress
  return (
    <section className={style.leftContent}>
      <div className={style.item} style={{ display: "flex", alignItems: "center" }}>
        <span className={style.labelItem}>ID Code</span>:
        <span className={style.textItem} style={{ flex: 1 }}>
          {objMain?.idCode}
        </span>
        <Button variant="outlined" startIcon={<DownloadIcon />} size="small" onClick={()=>downloadFileFromStorage(objMain)}>
          Download
        </Button>
      </div>
      <div className={style.item}>
        <span className={style.labelItem}>Name</span>:<span className={style.textItem}>{objMain?.name}</span>
      </div>
      <div className={style.item}>
        <span className={style.labelItem}>Type</span>:<span className={style.textItem}>{objMain?.type}</span>
      </div>
      <div className={style.item}>
        <span className={style.labelItem}>Author</span>:<span className={style.textItem}>{objMain?.author}</span>
      </div>
      <div className={style.item}>
        <span className={style.labelItem}>Date Upload</span>:
        <span className={style.textItem}>{objMain?.dateUpdate}</span>
      </div>
      <div className={style.item}>
        <span className={style.labelItem}>Version</span>:<span className={style.textItem}>{objMain?.version}</span>
      </div>
      <div className={style.item}>
        <span className={style.labelItem}>Status</span>:<span className={style.textItem}>{objMain?.status}</span>
      </div>
      <div className={style.commit}>
        <span className={style.titleCommit}>Commit :</span>
        <span className={style.textCommit}>{objMain?.commit}</span>
      </div>
      <span className={style.titleDetail}>Detail</span>
      <ul className={style.detail}>
        {[1, 2, 3, 4].map((crr, index) => {
          const item: any = objMain?.detail;
          const key = `line${crr}`;
          const newItem = item[key];
          return (
            <li className={style.listDetail} key={index}>
              <div className={style.itemDetail}>
                <span className={style.itemDetailText}>{newItem?.text}</span>
                <CollectionsRoundedIcon className={style.itemDetailImage} color={newItem.attachment ? "secondary": "disabled"}  onClick={()=>newItem.attachment && setModalImageOpen({isOpen:true, data:newItem.attachment})}/>
              </div>
            </li>
          );
        })}
      </ul>
      <CircularProgress color="success" style={{ display: showCircularProgress }} className={style.circularProgress} />
    </section>
  );
}
//JSX_END: Left side component

//JSX: Right side component
function RightSide({
  idCode,
  idCodeWithVersion,
  rightSideContentData4VP2,
  handelDirectViewPort2,
}: {
  idCode: string;
  idCodeWithVersion: { key: string; keyChild: string };
  rightSideContentData4VP2: ITF_drawingContent;
  handelDirectViewPort2: Function;
}) {
  //TODO: filter version
  let original: ITF_drawingContentItem = { idCode: "", name: "" };
  const oldRelease: string[] = [];
  let current: ITF_drawingContentItem = { idCode: "", name: "" };
  const keyArray = Object.keys(rightSideContentData4VP2);
  keyArray.forEach((value) => {
    const key = value as keyof ITF_drawingContent;
    const objectTemp: ITF_drawingContentItem = rightSideContentData4VP2?.[key];
    if (objectTemp.idCode === idCode) {
      if (objectTemp.status === "Old Release") {
        oldRelease.push(key);
      } else if (objectTemp.status === "Original") {
        original = objectTemp;
      } else if (objectTemp.status === "Current") {
        current = objectTemp;
      }
    }
  });
  //TODO_END: filter version
  return (
    <section className={style.rightContent}>
      <div className={style.original}>
        <div className={style.originalTitle}>Original</div>
        <div className={style.originalItem}>
          <span className={style.originalVersion}>v{original?.version}</span>
          <span
            className={style.originalName}
            onClick={() => {
              const key = original?.idCode;
              const keyChild = `${original?.idCode}-version-${original?.version}`;
              handelDirectViewPort2({ key, keyChild });
            }}
          >
            {original?.name}
          </span>
        </div>
      </div>
      <div className={style.original}>
        <div className={style.originalTitle} style={{ color: "red" }}>
          Current
        </div>
        <div className={style.originalItem}>
          <span className={style.originalVersion}>v{current?.version}</span>
          <span
            className={style.originalName}
            style={{color: 'red'}}
            onClick={() => {
              const key = current?.idCode;
              const keyChild = `${current?.idCode}-version-${current?.version}`;
              handelDirectViewPort2({ key, keyChild });
              console.log("🚀 ~ file: ViewPort2.tsx:201 ~ keyChild:", keyChild)
            }}
          >
            {current?.name}
          </span>
        </div>
      </div>
      <div className={style.oldRelease}>
        <div className={style.oldReleaseTitle}>Old Release</div>
        {oldRelease.map((crr, index) => {
          const keyTemp = crr as keyof ITF_drawingContent;
          const objectTemp: ITF_drawingContentItem = rightSideContentData4VP2?.[keyTemp];
          const key = objectTemp?.idCode;
          const keyChild = `${objectTemp?.idCode}-version-${objectTemp?.version}`;

          return (
            <div className={style.oldReleaseItem} key={index}>
              <span className={style.oldReleaseVersion}>v{objectTemp.version}</span>
              <span className={style.oldReleaseName} onClick={() => handelDirectViewPort2({ key, keyChild })}>
                {objectTemp.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
//JSX_END: Right side component
