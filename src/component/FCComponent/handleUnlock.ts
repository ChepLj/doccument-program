
import postDataToDB from "../../api/postDataToDB";
import { ITF_drawingContentItem } from "../../interface/interface";

export default function handleUnlock(childKey: string, key: string, itemRef: string,mainPageContext: any, authorLogin:any , item:ITF_drawingContentItem) {

  let containerUpload: any = [];
  const currentTimeInMilliseconds = Date.now().toString();
  
  containerUpload = [
    {
      ref: `${itemRef}/${key}/${childKey}/lock`,
      data: null,
    },
    {
      ref: `${itemRef}/${key}/${childKey}/lockMessenger`,
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
        status: 'Unlocked',
        type: item.type,
        version: item.version, 
        ref: item.ref,
        size: item.size,
        path: item.path,
        action: 'Unlocked',
      },
    },
  ];
  
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
