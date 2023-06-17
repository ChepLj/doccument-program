import { Header } from "./Header/Header";
import { LeftSide } from "./LeftSide/LeftSide";
import { RightSide } from "./RightSide/RightSide";
import style from "./MainPage.module.css";
import { useEffect, useState } from "react";
import { drawingContent } from "../../fakeData/fakeData";
import { ITF_drawingContent } from "../../interface/interface";

export function MainPage() {
  const [headerField, setHeaderField] = useState("");
  const [rightSideContent, setRightSideContent] = useState({ rootArea: "", motherArea: "" });

  let rightSideContentData: ITF_drawingContent = {};
  if (rightSideContent.motherArea != '') {
    const keyTempRoot = rightSideContent.rootArea as keyof ITF_drawingContent;
    const keyTempMother = rightSideContent.motherArea as keyof ITF_drawingContent;
    rightSideContentData = drawingContent?.[keyTempRoot]?.[keyTempMother] 
  }


  useEffect(()=>{setRightSideContent({ rootArea: "", motherArea: "" })},[headerField])
  return (
    <section className={style.mainContainer}>
      <Header setHeaderField={setHeaderField} />
      <div className={style.contentContainer}>
        <LeftSide field={headerField} setRightSideContent={setRightSideContent} />
        <RightSide
          rightSideContentData={rightSideContentData}
          rightSideContent = {rightSideContent}
        />
      </div>
    </section>
  );
}
