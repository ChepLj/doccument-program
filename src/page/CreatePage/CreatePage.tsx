import { useEffect, useState } from "react";
import { handleData4CreateIdCodeList } from "../../component/FCComponent/handleData4CreateIdCode";

import handleNowTime from "../../component/FCComponent/handleTime";
import { drawingContent, drawingField } from "../../fakeData/fakeData";
import { ITF_drawing, ITF_drawingContent, ITF_drawingContentItem } from "../../interface/interface";
import style from "./CreatePage.module.css";
import { Header } from "./Header/Header";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";
import { getKeyByValue } from "../../component/FCComponent/getKeyByValue";
import MIMEtype from "../../component/MIMEtype.json";
import { isObjectEmpty } from "../../component/FCComponent/isObjectEmpty";
import { upLoadDataCreatePage } from "../../component/FCComponent/handelUploadDataCreatePage";

export function CreatePage() {
  const [selectTypeValue, setSelectTypeValue] = useState<string>("");
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

  const [areaFieldList, setAreaFieldList] = useState<ITF_drawing[]>([]);
  const [localFieldList, setLocalFieldList] = useState<ITF_drawing[]>([]);
  const [groupFieldList, setGroupFieldList] = useState<{ id: string; name: string }[]>([]);
  const [idCodeFieldList, setIdCodeFieldList] = useState<{ id: string; name: string }[]>([]);

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
  };

  //TODO: handle Field
  const handleField = (fieldResult: string) => {
    setSelectTypeValue(fieldResult);
  };

  //: Area Field
  useEffect(() => {
    switch (selectTypeValue) {
      case "DRAWING": {
        const arrayTemp = [];
        for (const item in drawingField) {
          arrayTemp.push(drawingField[item]);
        }
        setAreaFieldList(arrayTemp);
        setLocalFieldList([]);
        setGroupFieldList([]);
        setIdCodeFieldList([]);
        setSelectAreaValue("");
        setNameInputValue("");
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
      const rootKey = JSON.parse(selectAreaValue).id as keyof ITF_drawingContent;
      const motherKey = JSON.parse(selectLocalValue).id as keyof ITF_drawingContent;
      const objectTemp = drawingContent?.[rootKey]?.[motherKey];
      const idCodeFieldArrayTemp = handleData4CreateIdCodeList(objectTemp);
      setSelectIdCodeValue("");
      setNameInputValue("");
      setIdCodeFieldList(idCodeFieldArrayTemp);
    }
  }, [selectLocalValue]);
  //: Name Input
  useEffect(() => {
    if (selectIdCodeValue) {
      if (selectIdCodeValue === "Create New") {
        setSelectGroupValue("");
        setNameInputValue("");
        setLocalGroupDisable(false);
      } else {
        setLocalGroupDisable(true);
        const selectIdCodeValueOjb = JSON.parse(selectIdCodeValue);
        const objGroupValue = selectIdCodeValueOjb?.localArea;
        setSelectGroupValue(JSON.stringify(objGroupValue));
        setNameInputValue(objGroupValue?.name);
      }
    }
  }, [selectIdCodeValue]);

  //TODO_END: handle Field

  return (
    <section className={style.container}>
      <Header upLoadAction={() => upLoadDataCreatePage(propUpload)} />
      <section className={style.content}>
        <LeftSide
          prop={{
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
      </section>
    </section>
  );
}
