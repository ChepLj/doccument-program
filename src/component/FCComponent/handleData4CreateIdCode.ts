import { ITF_drawingContentItem, ITF_drawingContent, ITF_ObjFilter } from "../../interface/interface";

//TODO: handle data
export const handleData4CreateIdCodeList = (idCodeData: ITF_drawingContentItem[]) => {
    const resultArray: any[] = [];
    const objFilter: any = {
      "01": {
        Current: [],
        New: []
      },
      "02": {
        Current: [],
        New: []
      },
      "03": {
        Current: [],
        New: []
      },
      "04": {
        Current: [],
        New: []
      },
      "05": {
        Current: [],
        New: []
      },
    };
    for (const key in idCodeData) {
      const keyTemp = key as keyof ITF_drawingContent;
      const itemTemp:ITF_drawingContent = idCodeData[keyTemp];
      for(const keyChild in itemTemp){
        const keyChildTemp = keyChild as keyof ITF_drawingContent
        const itemChildTemp:ITF_drawingContentItem =  itemTemp[keyChildTemp]
        switch (itemChildTemp.groupField?.id) {
          case "01": {
            if (itemChildTemp.status === "Current") {
              objFilter["01"].Current.push(itemChildTemp);
            }
            else if (itemChildTemp.status === "Waiting for approve") {
              objFilter["01"].New.push(itemChildTemp);
            }
            objFilter["01"].groupName = itemChildTemp.groupField.name;
            break;
          }
          case "02": {
            if (itemChildTemp.status === "Current") {
              objFilter["02"].Current.push(itemChildTemp);
            }
            else if (itemChildTemp.status === "Waiting for approve") {
              objFilter["02"].New.push(itemChildTemp);
            }
            objFilter["02"].groupName = itemChildTemp.groupField.name;
            break;
          }
          case "03": {
            if (itemChildTemp.status === "Current") {
              objFilter["03"].Current.push(itemChildTemp);
            }
            else if (itemChildTemp.status === "Waiting for approve") {
              objFilter["03"].New.push(itemChildTemp);
            }
            objFilter["03"].groupName = itemChildTemp.groupField.name;
            break;
          }
          case "04": {
            if (itemChildTemp.status === "Current") {
              objFilter["04"].Current.push(itemChildTemp);
            }
            else if (itemChildTemp.status === "Waiting for approve") {
              objFilter["04"].New.push(itemChildTemp);
            }
            objFilter["04"].groupName = itemChildTemp.groupField.name;
            break;
          }
          case "05": {
            if (itemChildTemp.status === "Current") {
              objFilter["05"].Current.push(itemChildTemp);
            }
            else if (itemChildTemp.status === "Waiting for approve") {
              objFilter["05"].New.push(itemChildTemp);
            }
            objFilter["05"].groupName = itemChildTemp.groupField.name;
            break;
          }
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



