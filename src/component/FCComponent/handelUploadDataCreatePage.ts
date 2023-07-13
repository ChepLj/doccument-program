import { get, ref } from "firebase/database";
import getDataFromDB from "../../api/getDataFromDB";
import { ITF_drawingContentItem } from "../../interface/interface";
import MIMEtype from "../MIMEtype.json";
import { getKeyByValue } from "./getKeyByValue";
import handleNowTime from "./handleTime";
import { database } from "../../api/firebase/firebaseConfig";

export async function upLoadDataCreatePage(prop: any) {
  console.log("🚀 ~ file: handelUploadDataCreatePage.ts:10 ~ upLoadDataCreatePage ~ prop:", prop)
  //TODO: validate data
  const validateData = () => {
    const condition1 =
      prop.selectTypeValue !== "" &&
      prop.selectAreaValue !== "" &&
      prop.selectLocalValue !== "" &&
      prop.selectGroupValue !== "" &&
      prop.selectIdCodeValue !== "";
    const condition2 = prop.commitInput !== "";
    const condition3 = typeof prop.file !== "undefined";
    if (condition1 && condition2 && condition3) {
      return true;
    }
    return false;
  };
  //TODO_END: validate data
  //TODO: handle prepare data upload

  //: handle ID code
  const handleIdCode = async (typeValue:any,areaValue: any, localValue: any) => {
    if (prop.selectIdCodeValue === "Create New") {
      const areaId = areaValue.id;
      const localId = localValue.id;
      const typeName = typeValue.name
      const refChild = `${typeName}/${areaId}/${localId}`;
      const mainRef = ref(database, refChild);
      try {
        const snapshot = await get(mainRef);
        if (snapshot.exists()) {
          const objectTemp = snapshot.val();
          const keyOfObjectTemp = Object.keys(objectTemp);
          const itemArray = keyOfObjectTemp.map((crr) => {
            return +crr.slice(6);
          });
          const newItem = Math.max(...itemArray) + 1;
          if (newItem > 9) {
            return `${areaId}-${localId}-${newItem}`;
          }
          return `${areaId}-${localId}-0${newItem}`;
        } else {
          return `${areaId}-${localId}-01`;
        }
      } catch {
        alert("can't get idCode, upload failure");
        window.location.replace("/create");
      }
    }
    return JSON.parse(prop.selectIdCodeValue).idCode;
  };
  //: handle detail
  const handleDetail = () => {
    return {
      line1: {
        text: prop.newChangeInputLine1,
        attachment: [],
      },
      line2: {
        text: prop.newChangeInputLine2,
        attachment: [],
      },
      line3: {
        text: prop.newChangeInputLine3,
        attachment: [],
      },
      line4: {
        text: prop.newChangeInputLine4,
        attachment: [],
      },
    };
  };
  //: handle version
  const handleVersion = () => {
    if (prop.selectIdCodeValue === "Create New") {
      return "01";
    } else {
      const newVersionTemp = +JSON.parse(prop.selectIdCodeValue).version + 1;
      if (newVersionTemp > 9) {
        return `${newVersionTemp}`;
      }
      return `0${newVersionTemp}`;
    }
  };
  if (validateData()) {
    const typeValue = JSON.parse(prop.selectTypeValue)
    const areaValue = JSON.parse(prop.selectAreaValue);
    const localValue = JSON.parse(prop.selectLocalValue);
    const groupValue = JSON.parse(prop.selectGroupValue);

    // const idCodeValue = JSON.parse(prop.selectIdCodeValue);
    const objectData: ITF_drawingContentItem = {
      idCode: await handleIdCode(typeValue,areaValue, localValue),
      name: prop.nameInputValue,
      type: prop.file?.type ? getKeyByValue(MIMEtype, prop.file.type) : "...",
      author: prop.authorLogin.displayName,
      authorId: prop.authorLogin.userName,
      dateUpdate: handleNowTime("date only"),
      version: handleVersion(),
      status: "Waiting for approve",
      size: prop.file?.size,
      path: `${typeValue.name}/(${areaValue.id})${areaValue.name}/(${localValue.id})${localValue.name}/(${groupValue.id})${groupValue.name}/`,
      ref: `${typeValue.name}/${areaValue.id}/${localValue.id}`,
      groupStyle: {
        id: typeValue.id,
        name: typeValue.name,
      },
      areaField: {
        id: areaValue.id,
        name: areaValue.name,
      },
      localField: {
        id: localValue.id,
        name: localValue.name,
      },
      groupField: {
        id: groupValue.id,
        name: groupValue.name,
      },
      commit: prop.commitInput,
      detail: handleDetail(),
      urlFileStore: "",
      accessRights: [],
      available: "normal",
    };
    // console.log("🚀 ~ file: CreatePage.tsx:107 ~ handlePrepareDataUpload ~ objectData:", objectData);

    prop?.setUploadState({
      isUpload: true,
      data: objectData,
    });
  } else alert("Tất cả các trường có dấu * phải được điền !!!");

  //TODO_END: handle prepare data upload
}
