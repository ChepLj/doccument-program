import { ITF_drawingContentItem, ITF_drawingContent, ITF_ObjFilter } from "../../interface/interface";

//TODO: handle data
export const handleData4CreateIdCodeList = (idCodeData: ITF_drawingContentItem[]) => {
    const resultArray: any[] = [];
    const objFilter: any = {
      "01": {
        Current: [],
      },
      "02": {
        Current: [],
      },
      "03": {
        Current: [],
      },
      "04": {
        Current: [],
      },
      "05": {
        Current: [],
      },
    };
    for (const key in idCodeData) {
      const keyTemp = key as keyof ITF_drawingContent;
      const itemTemp: ITF_drawingContentItem = idCodeData[keyTemp];

      switch (itemTemp.localArea?.id) {
        case "01": {
          if (itemTemp.status === "Current") {
            objFilter["01"].Current.push(itemTemp);
          }
          objFilter["01"].groupName = itemTemp.localArea.name;
          break;
        }
        case "02": {
          if (itemTemp.status === "Current") {
            objFilter["02"].Current.push(itemTemp);
          }
          objFilter["02"].groupName = itemTemp.localArea.name;
          break;
        }
        case "03": {
          if (itemTemp.status === "Current") {
            objFilter["03"].Current.push(itemTemp);
          }
          objFilter["03"].groupName = itemTemp.localArea.name;
          break;
        }
        case "04": {
          if (itemTemp.status === "Current") {
            objFilter["04"].Current.push(itemTemp);
          }
          objFilter["04"].groupName = itemTemp.localArea.name;
          break;
        }
        case "05": {
          if (itemTemp.status === "Current") {
            objFilter["05"].Current.push(itemTemp);
          }
          objFilter["05"].groupName = itemTemp.localArea.name;
          break;
        }
      }
    }
    //: chuyen object sang array de render
    for (const item in objFilter) {
      const keyTemp = item as keyof ITF_ObjFilter;
      const objectTemp = objFilter[keyTemp];

      if (objectTemp.Current.length !== 0) {
        const objTemp = objectTemp;
        objTemp.id = item;
        resultArray.push(objTemp);
      }
    }
    return resultArray;
  };

  //TODO_END: handle data



