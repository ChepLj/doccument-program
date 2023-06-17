import { ITF_drawingContentItem } from "../../interface/interface";
import { getKeyByValue } from "./getKeyByValue";
import handleNowTime from "./handleTime";
import MIMEtype from "../MIMEtype.json";

export function upLoadDataCreatePage(prop: any) {
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

  if (validateData()) {

    //: handle ID code
    const handleIdCode = () => {
      if (prop.selectIdCodeValue === "Create New") {
        return "Create New";
      }
      return JSON.parse(prop.selectIdCodeValue);
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
    const objectData: ITF_drawingContentItem = {
      idCode: handleIdCode(),
      name: prop.nameInputValue,
      type: prop.file?.type ? getKeyByValue(MIMEtype, prop.file.type) : "...",
      author: "Nguyen Van A",
      dateUpdate: handleNowTime("date only"),
      version: handleVersion(),
      status: "New",
      size: prop.file?.size,
      groupArea: {
        id: "01",
        name: "DRAWING",
      },
      rootArea: {
        id: JSON.parse(prop.selectAreaValue).id,
        name: JSON.parse(prop.selectAreaValue).name,
      },
      motherArea: {
        id: JSON.parse(prop.selectLocalValue).id,
        name: JSON.parse(prop.selectLocalValue).name,
      },
      localArea: {
        id: JSON.parse(prop.selectGroupValue).id,
        name: JSON.parse(prop.selectGroupValue).name,
      },
      commit: prop.commitInput,
      detail: handleDetail(),
      urlFileStore: "",
      accessRights: [],
      available: "normal",
    };
    console.log("🚀 ~ file: CreatePage.tsx:107 ~ handlePrepareDataUpload ~ objectData:", objectData);
  } else alert("Tất cả các trường có dấu * phải được điền !!!");

  //TODO_END: handle prepare data upload
}
