import { useEffect, useState } from "react";
import style from "./RightSide.module.css";
import ViewPort1 from "./ViewPort1/ViewPort1";
import ViewPort2 from "./ViewPort2/ViewPort2";
import { isObjectEmpty } from "../../../component/FCComponent/isObjectEmpty";
import ViewPortNoData from "./ViewPortNoData/ViewPortNoData";

export function RightSide({
  rightSideContentData,
  rightSideContent,
}: {
  rightSideContentData: any;
  rightSideContent: { rootArea: string; motherArea: string };
}) {
  const [viewPort, setViewPort] = useState({
    viewPort: "ViewPortNoData",
    key: "",
  });
  let viewPortRender = {
    viewPort: 'ViewPortNoData',
    key: "",
  };
 
  if (isObjectEmpty(rightSideContentData) || typeof rightSideContentData === "undefined") {
    viewPortRender = {
      viewPort: 'ViewPortNoData',
      key: "",
    };
  } else {
    viewPortRender = viewPort;
  }

  //TODO: handle direct viewport 2
  const handelDirectViewPort2 = (idCodeWithVersion: string) => {
    setViewPort({
      viewPort: "ViewPort2",
      key: idCodeWithVersion,
    });
  };
  //TODO_END: handle direct viewport 2
  //TODO: handle back viewport 1
  const handleBackToViewPort1 = () => {
    setViewPort({
      viewPort: "ViewPort1",
      key: "",
    });
  };
  //TODO_END: handle back viewport 1
  //TODO: reset viewPort when left side motherArea had change
  useEffect(() => {
    setViewPort({
      viewPort: "ViewPort1",
      key: "",
    });
  }, [rightSideContent.motherArea || rightSideContent.rootArea]);
  //TODO_END: reset viewPort when left side motherArea had change

  return (
    <div className={style.contentContainer}>
      {viewPortRender.viewPort === "ViewPort1" && (
        <ViewPort1 rightSideContentData={rightSideContentData} handelDirectViewPort2={handelDirectViewPort2} />
      )}
      {viewPortRender.viewPort === "ViewPort2" && (
        <ViewPort2
          idCodeWithVersion={viewPortRender.key}
          rightSideContentData={rightSideContentData}
          handleBackToViewPort1={handleBackToViewPort1}
          handelDirectViewPort2={handelDirectViewPort2}
        />
      )}
      {viewPortRender.viewPort === "ViewPortNoData" && (
        <ViewPortNoData
        />
      )}
    </div>
  );
}
