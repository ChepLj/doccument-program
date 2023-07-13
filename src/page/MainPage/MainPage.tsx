import { createContext, useContext, useEffect, useState } from "react";
import getDataFromDB from "../../api/getDataFromDB";
import { Header } from "./Header/Header";
import { LeftSide } from "./LeftSide/LeftSide";
import style from "./MainPage.module.css";
import { RightSide } from "./RightSide/RightSide";
import { AuthContext } from "../LoginPage/function/loginContext";
import { ModalImageShow } from "./RightSide/ViewPort2/ModalImageShow";

///////
export const MainPageContext = createContext({});
export function MainPage() {

  const [rightSideContentData, setRightSideContentData] = useState();
  const [refreshState, setRefreshState] = useState<number>(0)
  const { authorLogin } = useContext<any>(AuthContext);
  // console.log("🚀 ~ file: MainPage.tsx:16 ~ MainPage ~ authorLogin:", authorLogin)
  const [modalImageOpen,setModalImageOpen] = useState<{isOpen:boolean, data?: string[]}>({isOpen:false})

  const locationState = window.history.state;
  console.log("🚀 ~ file: MainPage.tsx:17 ~ MainPage ~ locationState:", locationState)
  useEffect(() => {
    if (locationState[2] != "") {
      const ref = `${locationState[0]}/${locationState[1]}/${locationState[2]}/`;
      const callback = (result: any) => {
        if (result.type === "SUCCESSFUL") {

          setRightSideContentData(result.payload);
        } else if (result.type === "No data available") {
          setRightSideContentData(undefined);
        } else {
          alert("something is wrong! can not get data");
        }
      };
      getDataFromDB(ref, callback);
    }
  }, [refreshState]);
  return (
    <MainPageContext.Provider value={{refreshState, setRefreshState}}>
      <section className={style.mainContainer}>
        <Header setRefreshState={setRefreshState} locationState={locationState}/>
        <div className={style.contentContainer}>
          <LeftSide locationState={locationState} setRefreshState={setRefreshState}/>
          <RightSide rightSideContentData={rightSideContentData} locationState={locationState} setModalImageOpen={setModalImageOpen}/>
        </div>
      </section>
     {modalImageOpen.isOpen && <ModalImageShow modalImageOpen={modalImageOpen} setModalImageOpen={setModalImageOpen}/>}
    </MainPageContext.Provider>
  );
}
