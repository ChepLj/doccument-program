import { useContext, useEffect, useState } from "react";
import { handleData4CreateIdCodeList } from "../../component/FCComponent/handleData4CreateIdCode";

import getDataFromDB from "../../api/getDataFromDB";
import { upLoadDataCreatePage } from "../../component/FCComponent/handelUploadDataCreatePage";
import { ITF_Area, ITF_drawing, ITF_drawingContent, ITF_drawingContentItem } from "../../interface/interface";
import style from "./CreatePage.module.css";
import { Header } from "./Header/Header";
import LeftSide from "./LeftSide/LeftSide";
import ProgressUpload from "./ProgressUpload/ProgressUpload";
import RightSide from "./RightSide/RightSide";
import { AuthContext } from "../LoginPage/function/loginContext";

export function CreatePage() {
  //TODO: mount
  console.log("%cCreatePage Render", "color:green");
  useEffect(() => {
    return () => {
      console.log("%cCreatePage Unmount", "color:red");
    };
  }, []);
  //TODO_EMD: mount
  const locationState: ITF_drawingContentItem = window.history.state.stateProp;
  const { authorLogin } = useContext<any>(AuthContext);
  console.log("🚀 ~ file: CreatePage.tsx:28 ~ CreatePage ~ locationState:", locationState);
  const [selectTypeValue, setSelectTypeValue] = useState<any>("");
  const [selectAreaValue, setSelectAreaValue] = useState<any>("");
  const [selectLocalValue, setSelectLocalValue] = useState<any>("");
  const [selectGroupValue, setSelectGroupValue] = useState<any>("");
  const [selectIdCodeValue, setSelectIdCodeValue] = useState<any>("");
  const [selectFileTypeValue, setSelectFileTypeValue] = useState<string>("");
  const [nameInputValue, setNameInputValue] = useState<string>("");
  const [localGroupDisable, setLocalGroupDisable] = useState(false);
  const [commitInput, setCommitInput] = useState("");
  const [newChangeInputLine1, setNewChangeInputLine1] = useState("");
  const [newChangeInputLine2, setNewChangeInputLine2] = useState("");
  const [newChangeInputLine3, setNewChangeInputLine3] = useState("");
  const [newChangeInputLine4, setNewChangeInputLine4] = useState("");
  const [file, setFile] = useState<File>();
  const [imageArray1, setImageArray1] = useState([]);
  const [imageArray2, setImageArray2] = useState([]);
  const [imageArray3, setImageArray3] = useState([]);
  const [imageArray4, setImageArray4] = useState([]);
  const typeList = [
    {
      id: "01",
      name: "DRAWING",
      color: "red",
    },
    {
      id: "02",
      name: "DOCUMENT",
      color: "green",
    },
    {
      id: "03",
      name: "PROGRAM",
      color: "violet",
    },
  ];
  const [areaFieldList, setAreaFieldList] = useState<ITF_drawing[] | ITF_Area[]>([]);
  const [localFieldList, setLocalFieldList] = useState<ITF_drawing[]>([]);
  const [groupFieldList, setGroupFieldList] = useState<{ id: string; name: string }[]>([]);
  const [idCodeFieldList, setIdCodeFieldList] = useState<{ id: string; name: string }[]>([]);
  const [uploadState, setUploadState] = useState({
    isUpload: false,
    data: {},
  });

  const propUpload = {
    selectTypeValue,
    selectAreaValue,
    selectLocalValue,
    selectGroupValue,
    selectIdCodeValue,
    selectFileTypeValue,
    nameInputValue,
    commitInput,
    newChangeInputLine1,
    newChangeInputLine2,
    newChangeInputLine3,
    newChangeInputLine4,
    file,
    imageArray1,
    imageArray2,
    imageArray3,
    imageArray4,
    setUploadState,
    authorLogin
  };

  //TODO: create Field from main page
  //: group type
  useEffect(() => {
    if (locationState?.groupStyle?.name) {
      for (const item of typeList) {
        if (item.name === locationState.groupStyle.name) {
          handleField(JSON.stringify(item));
          break;
        }
      }
    }
  }, []);
  //: area
  useEffect(() => {
    if (locationState?.areaField?.id && areaFieldList !== undefined) {
      for (const item of areaFieldList) {
        if (item.id === locationState.areaField?.id) {
          setSelectAreaValue(JSON.stringify(item));
        }
      }
    }
  }, [areaFieldList]);
  //: local
  useEffect(() => {
    if (locationState?.localField?.id && localFieldList !== undefined) {
      for (const item of localFieldList) {
        if (item.id === locationState.localField?.id) {
          setSelectLocalValue(JSON.stringify(item));
        }
      }
    }
  }, [localFieldList]);
  //: idCode
  useEffect(() => {
    if (locationState && idCodeFieldList.length > 1) {
      if (locationState.idCode === "Create New") {
        setSelectIdCodeValue("Create New");
        setSelectGroupValue(JSON.stringify(locationState?.groupField));
      } else {
        setSelectIdCodeValue(JSON.stringify(locationState));
      }
    }
  }, [idCodeFieldList]);

  //TODO_END: create Field from main page

  //TODO: handle Field
  const handleField = (fieldResult: string) => {
    setSelectTypeValue(fieldResult);
  };

  //: Area Field
  useEffect(() => {
    if (selectTypeValue) {
      const type = JSON.parse(selectTypeValue).name;
      switch (type) {
        case "DRAWING": {
          const ref = "DRAWING/FIELD/";
          const callback = (result: any) => {
            if (result.type === "SUCCESSFUL") {
              const arrayTemp = [];
              const drawingField = result.payload;
              for (const item in drawingField) {
                arrayTemp.push(drawingField[item]);
              }
              setAreaFieldList(arrayTemp);
            } else {
              alert("can not get FIELD of DRAWING !!! Failure");
            }
          };
          getDataFromDB(ref, callback);
          setLocalFieldList([]);
          setGroupFieldList([]);
          setIdCodeFieldList([]);
          setSelectAreaValue("");
          setNameInputValue("");
          setCommitInput("");
          setSelectLocalValue("");
          setSelectIdCodeValue("");
          break;
        }
        case "DOCUMENT": {
          const arrayTemp = [];
          // for (const item in drawingField) {
          //   arrayTemp.push({ id: drawingField[item].id, name: drawingField[item].name });
          // }
          setAreaFieldList([]);
          setLocalFieldList([]);
          setGroupFieldList([]);
          setIdCodeFieldList([]);
          setNameInputValue("");

          break;
        }
        case "PROGRAM": {
          const ref = "PROGRAM/FIELD/";
          const callback = (result: any) => {
            if (result.type === "SUCCESSFUL") {
              const arrayTemp = [];
              const programField = result.payload;
              for (const item in programField) {
                arrayTemp.push(programField[item]);
              }
              setAreaFieldList(arrayTemp);
            } else {
              alert("can not get FIELD of PROGRAM !!! Failure");
            }
          };
          getDataFromDB(ref, callback);
          setLocalFieldList([]);
          setGroupFieldList([]);
          setIdCodeFieldList([]);
          setSelectAreaValue("");
          setNameInputValue("");
          setCommitInput("");
          setSelectLocalValue("");
          setSelectIdCodeValue("");
          break;
        }
      }
    }
  }, [selectTypeValue]);

  //: Local Field
  useEffect(() => {
    if (selectAreaValue) {
      const arrayTemp = [];
      // const areaObject = drawingField.filter((value) => {
      //   return value.id === selectAreaValue.id;
      // });
      const obj = JSON.parse(selectAreaValue).item;
      setLocalFieldList(obj);
      setGroupFieldList([]);
      setIdCodeFieldList([]);
      setSelectLocalValue("");
      setNameInputValue("");
      setSelectIdCodeValue("");
    }
  }, [selectAreaValue]);
  //: Group Field
  useEffect(() => {
    if (selectLocalValue) {
      const groupObject = JSON.parse(selectLocalValue)?.item;
      setGroupFieldList(groupObject);
      setIdCodeFieldList([]);
      setSelectGroupValue("");
    }
  }, [selectLocalValue]);
  //: IdCode Field
  useEffect(() => {
    if (selectLocalValue) {
      const typeName = JSON.parse(selectTypeValue).name;
      const areaId = JSON.parse(selectAreaValue).id;
      const localId = JSON.parse(selectLocalValue).id;
      const refChild = `${typeName}/${areaId}/${localId}`;
      const callback = (result: any) => {
        if (result.type === "SUCCESSFUL") {
          const idCodeFieldArrayTemp = handleData4CreateIdCodeList(result.payload);

          setIdCodeFieldList(idCodeFieldArrayTemp);
        }
      };
      getDataFromDB(refChild, callback);
      setSelectIdCodeValue("");
      setNameInputValue("");
    }
  }, [selectLocalValue]);
  //: Name Input & group
  useEffect(() => {
    if (selectIdCodeValue) {
      if (selectIdCodeValue === "Create New") {
        if (!locationState?.groupField) {
          //:chan reset group khi tu trang viewport 1 qua
          setSelectGroupValue("");
        }

        setNameInputValue("");
        setLocalGroupDisable(false);
      } else {
        setLocalGroupDisable(true);
        const selectIdCodeValueOjb = JSON.parse(selectIdCodeValue);
        const objGroupValue = selectIdCodeValueOjb?.groupField;
        setSelectGroupValue(JSON.stringify(objGroupValue));
        setNameInputValue(selectIdCodeValueOjb?.name);
      }
    }
  }, [selectIdCodeValue]);

  //TODO_END: handle Field

  return (
    <section className={style.container}>
      <Header upLoadAction={() => upLoadDataCreatePage(propUpload)} />
      <section className={style.content}>
        {uploadState.isUpload === false && (
          <>
            <LeftSide
              prop={{
                typeList,
                selectTypeValue,
                setSelectTypeValue,
                selectAreaValue,
                setSelectAreaValue,
                selectLocalValue,
                setSelectLocalValue,
                selectGroupValue,
                setSelectGroupValue,
                selectIdCodeValue,
                setSelectIdCodeValue,
                selectFileTypeValue,
                setSelectFileTypeValue,
                imageArray1,
                setImageArray1,
                imageArray2,
                setImageArray2,
                imageArray3,
                setImageArray3,
                imageArray4,
                setImageArray4,
                handleField,
                areaFieldList,
                localFieldList,
                groupFieldList,
                idCodeFieldList,
                nameInputValue,
                setNameInputValue,
                localGroupDisable,
                commitInput,
                setCommitInput,
                newChangeInputLine1,
                newChangeInputLine2,
                newChangeInputLine3,
                newChangeInputLine4,
                setNewChangeInputLine1,
                setNewChangeInputLine2,
                setNewChangeInputLine3,
                setNewChangeInputLine4,
              }}
            />
            <RightSide
              prop={{
                file,
                setFile,
                imageArray1,
                setImageArray1,
                imageArray2,
                setImageArray2,
                imageArray3,
                setImageArray3,
                imageArray4,
                setImageArray4,
              }}
            />
          </>
        )}
        {uploadState.isUpload === true && (
          <ProgressUpload
            prop={{
              dataObject: uploadState?.data,
              file: file,
              image: [imageArray1, imageArray2, imageArray3, imageArray4],
            }}
          />
          // <h3>dsfsdff</h3>
        )}
      </section>
    </section>
  );
}
