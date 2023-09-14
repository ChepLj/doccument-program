import { get, ref } from "firebase/database";
import { database } from "../../api/firebase/firebaseConfig";
import { ITF_drawingContentItem } from "../../interface/interface";
import { MIMEtype } from "../MIMEtype";
import { getKeyByValue } from "./getKeyByValue";
import handleNowTime from "./handleTime";
import getDataFromDB from "../../api/getDataFromDB";

export async function upLoadDataCreatePage(prop: any) {
  // console.log("🚀 ~ file: handelUploadDataCreatePage.ts:10 ~ upLoadDataCreatePage ~ prop:", prop)
  //TODO: validate data
  const validateData = () => {
    const condition1 = prop.selectTypeValue !== "" && prop.selectAreaValue !== "" && prop.selectLocalValue !== "" && prop.selectGroupValue !== "" && prop.selectIdCodeValue !== "";
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
  const handleIdCode = async (typeValue: any, areaValue: any, localValue: any) => {
    if (prop.selectIdCodeValue === "Create New") {
      const areaId = areaValue.id;
      const localId = localValue.id;
      const typeName = typeValue.name;
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
      imageRef: "",
      line1: {
        // text: prop.newChangeInputLine1,
        text: prop.newChangeInputLine1.replaceAll("\n", "<br/>"),
        attachment: [],
      },
      line2: {
        text: prop.newChangeInputLine2.replaceAll("\n", "<br/>"),
        attachment: [],
      },
      line3: {
        text: prop.newChangeInputLine3.replaceAll("\n", "<br/>"),
        attachment: [],
      },
      line4: {
        text: prop.newChangeInputLine4.replaceAll("\n", "<br/>"),
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
  //TODO: handle Create Object Data Upload
  const createObjectDataUpload = async () => {
    const typeValue = JSON.parse(prop.selectTypeValue);
    const areaValue = JSON.parse(prop.selectAreaValue);
    const localValue = JSON.parse(prop.selectLocalValue);
    const groupValue = JSON.parse(prop.selectGroupValue);
    const handleTypeFile = (): string => {
      const tag = getKeyByValue(MIMEtype, prop.file.type);
      if (tag) {
        return tag;
      } else {
        const temp = prop.file.name.split(".");
        const tag2 = temp[temp.length - 1];
        return tag2;
      }
    };

    // const idCodeValue = JSON.parse(prop.selectIdCodeValue);
    const objectData: ITF_drawingContentItem = {
      idCode: await handleIdCode(typeValue, areaValue, localValue),
      name: prop.nameInputValue,
      type: handleTypeFile(),
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
      urlFileStore: {
        fileURL: "",
        fileRef: "",
      },
      accessRights: [],
      available: "normal",
    };
    console.log("🚀 ~ file: CreatePage.tsx:107 ~ handlePrepareDataUpload ~ objectData:", objectData);

    prop?.setUploadState({
      isUpload: true,
      data: objectData,
    });
  };
  //TODO_END: handle Create Object Data Upload

  if (validateData()) {
    const maxFileUploadSize = 80000000;
    if (prop.file?.size > maxFileUploadSize) {
      const promptInput = prompt(`Kích thước File tối đa là ${maxFileUploadSize} byte. \nNếu vẫn muốn upload File kích thước lớn hơn, nhập mã code Upload Large File bên dưới !`);
      //TODO: Get Upload Large File Code
      const ref = `CODE/`;
      const callback = (result: any) => {
        if (result.type === "SUCCESSFUL") {
          const code = result.payload.LargeFileUploadCode;
          if (code === promptInput) {
            createObjectDataUpload();
          } else {
            alert("Sai mật mã. Nhập lại !");
          }
        } else {
          alert("something is wrong! can not get data");
        }
      };
      getDataFromDB(ref, callback);

      //TODO_ENd: Get Upload Large File Cod
    } else {
      createObjectDataUpload();
    }
  } else alert("Tất cả các trường có dấu * phải được điền !!!");

  //TODO_END: handle prepare data upload
}
