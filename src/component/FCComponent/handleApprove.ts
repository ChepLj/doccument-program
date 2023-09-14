
import postDataToDB from "../../api/postDataToDB";
import { ITF_drawingContentItem } from "../../interface/interface";
import handleNowTime from "./handleTime";

export default function handleApprove(childKey: string, key: string, itemRef: string, itemList: any, mainPageContext: any, authorLogin:any , logsKey: string | number , item:ITF_drawingContentItem) {
  let currentKey = "";
  for (const key in itemList) {
    if (itemList[key].status === "Current") {
      currentKey = key;
    }
  }

  let containerUpload: any = [];
  const currentTimeInMilliseconds = Date.now().toString();
  if (currentKey !== "") {

    containerUpload = [
      {
        ref: `${itemRef}/${key}/${childKey}/status`,
        data: "Current",
      },
      {
        ref: `${itemRef}/${key}/${childKey}/approver`,
        data: authorLogin.displayName,
      },
      {
        ref: `${itemRef}/${key}/${currentKey}/status`,
        data: "Old Release",
      },
      {
        ref: `LOGS/WaitingForApprove/${logsKey}`,
        data: null,
      },
      {
        ref: `LOGS/DataLogs/${currentTimeInMilliseconds}`,
        data: {
          logsKey: currentTimeInMilliseconds,
          author: item.author,
          actionAuthor: authorLogin.displayName,
          authorId: item.authorId,
          available: item.available,
          commit: item.commit,
          dateUpdate: item.dateUpdate,
          idCode: item.idCode,
          name: item.name,
          status: 'Current',
          type: item.type,
          version: item.version, 
          ref: item.ref,
          size: item.size,
          path: item.path,
          action: 'Approved',
        },
      },
    ];
  } else {
    containerUpload = [
      {
        ref: `${itemRef}/${key}/${childKey}/status`,
        data: "Current",
      },
      {
        ref: `LOGS/WaitingForApprove/${logsKey}`,
        data: null,
      },
      {
        ref: `LOGS/DataLogs/${currentTimeInMilliseconds}`,
        data: {
          logsKey: currentTimeInMilliseconds,
          author: item.author,
          actionAuthor: authorLogin.displayName,
          authorId: item.authorId,
          available: item.available,
          commit: item.commit,
          dateUpdate: item.dateUpdate,
          idCode: item.idCode,
          name: item.name,
          status: 'Current',
          type: item.type,
          version: item.version, 
          ref: item.ref,
          size: item.size,
          path: item.path,
          action: 'Approved',
        },
      },
    ];
  }
  const callback = (result: string) => {
    if (result === "post successfully!") {
      window.history.pushState([...itemRef.split("/"), childKey], "", "/");
      mainPageContext.setRefreshState(Math.random()); //: reload lai trang
    } else {
      alert("something is wrong, can not approve !");
    }
  };
  postDataToDB(containerUpload, callback);
}
