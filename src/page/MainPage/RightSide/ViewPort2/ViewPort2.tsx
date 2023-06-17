import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import DownloadIcon from "@mui/icons-material/Download";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { ITF_drawingContent, ITF_drawingContentItem } from "../../../../interface/interface";
import style from "./ViewPort2.module.css";
import { ClassNames } from "@emotion/react";

export default function ViewPort2({
  idCodeWithVersion,
  rightSideContentData,
  handleBackToViewPort1,
  handelDirectViewPort2,
}: {
  idCodeWithVersion: string;
  rightSideContentData: ITF_drawingContent;
  handleBackToViewPort1: Function;
  handelDirectViewPort2: Function;
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
  const keyTemp = idCodeWithVersion as keyof ITF_drawingContent;
  const objMain: ITF_drawingContentItem = rightSideContentData[keyTemp];
  const idCode = objMain?.idCode

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
          >{`${objMain?.groupArea?.name}/ (${objMain?.rootArea?.id})${objMain?.rootArea?.name}/ (${objMain?.motherArea?.id})${objMain?.motherArea?.name}/ (${objMain?.localArea?.id})${objMain?.localArea?.name}`}</div>
        </div>
      </header>
      <section className={style.contentContainer}>
        <LeftSide objMain={objMain} />

        <RightSide idCode={idCode} idCodeWithVersion={idCodeWithVersion} rightSideContentData={rightSideContentData} handelDirectViewPort2={handelDirectViewPort2}  />
      </section>
    </section>
  );
}

//JSX: Left side component
function LeftSide({ objMain }: { objMain: ITF_drawingContentItem }) {
  const [showCircularProgress, setShowCircularProgress] = useState('block')
  


  //TODO: circular Progress
  useEffect(()=>{
    setShowCircularProgress('block')
    const  circularProgress = setTimeout(()=>{
      setShowCircularProgress('none')
    }, 500)
    return (()=>{
      clearTimeout(circularProgress)
    })
  },[objMain])
  //TODO_END: circular Progress
  return (
    <section className={style.leftContent}>
      <div className={style.item} style={{ display: "flex", alignItems: "center" }}>
        <span className={style.labelItem}>ID Code</span>:
        <span className={style.textItem} style={{ flex: 1 }}>
          {objMain?.idCode}
        </span>
        <Button variant="outlined" startIcon={<DownloadIcon />} size="small">
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
        {objMain?.detail?.map((crr, index) => {
          return (
            <li className={style.listDetail} key={index}>
              <div className={style.itemDetail}>
                <span className={style.itemDetailText}>{crr.text}</span>
                <CollectionsRoundedIcon className={style.itemDetailImage} color="disabled" />
              </div>
            </li>
          );
        })}
      </ul>
      <CircularProgress color="success"  style={{display : showCircularProgress} } className={style.circularProgress}/>
    </section>
  );
}
//JSX_END: Left side component

//JSX: Right side component
function RightSide({
  idCode,
  idCodeWithVersion,
  rightSideContentData,
  handelDirectViewPort2,


}: {
  idCode: string,
  idCodeWithVersion: string;
  rightSideContentData: ITF_drawingContent;
  handelDirectViewPort2: Function;


}) {


  //TODO: filter version
  let original:ITF_drawingContentItem ={idCode:'', name: ''}
  const oldRelease:string[] = []
  let current:ITF_drawingContentItem ={idCode:'', name: ''}
  const keyArray = Object.keys(rightSideContentData)
  keyArray.forEach((value)=>{
    const key = value as keyof ITF_drawingContent
    const objectTemp:ITF_drawingContentItem = rightSideContentData?.[key]
    if(objectTemp.idCode === idCode){
      if(objectTemp.status === 'Old Release'){
        oldRelease.push(key)
      }else if(objectTemp.status === 'Original'){
        original = objectTemp
      }else if(objectTemp.status === 'Current'){
        current = objectTemp
      }
    }
  })
  //TODO_END: filter version
  return (
    <section className={style.rightContent}>
      <div className={style.original}>
        <div className={style.originalTitle}>Original</div>
        <div className={style.originalItem}>
          <span className={style.originalVersion}>v{original?.version}</span>
          <span className={style.originalName} onClick={() => handelDirectViewPort2(`${original?.idCode}v${original?.version}`)}>{original?.name}</span>
        </div>
      </div>
      <div className={style.original}>
        <div className={style.originalTitle} style={{color: 'red'}}>Current</div>
        <div className={style.originalItem}>
          <span className={style.originalVersion}>v{current?.version}</span>
          <span className={style.originalName} onClick={() => handelDirectViewPort2(`${current?.idCode}v${current?.version}`)}>{current?.name}</span>
        </div>
      </div>
      <div className={style.oldRelease}>
        <div className={style.oldReleaseTitle}>Old Release</div>
        {oldRelease.map((crr, index)=>{
          const key = crr as keyof ITF_drawingContent
          const objectTemp:ITF_drawingContentItem = rightSideContentData?.[key]
          return <div className={style.oldReleaseItem} key={index}>
          <span className={style.oldReleaseVersion}>v{objectTemp.version}</span>
          <span className={style.oldReleaseName} onClick={() => handelDirectViewPort2(crr)}>{objectTemp.name}</span>
        </div>
        })}

      </div>
    </section>
  );
}
//JSX_END: Right side component
