
import postDataToDB from "../../api/postDataToDB";
import { ITF_drawingContentItem } from "../../interface/interface";

export default function handleLock(type:string, childKey: string, key: string, itemRef: string, mainPageContext: any, authorLogin:any , item:ITF_drawingContentItem) {

  let containerUpload: any = [];
  const currentTimeInMilliseconds = Date.now().toString();
    if(type === 'Access Lock'){
      containerUpload = [
        {
          ref: `${itemRef}/${key}/${childKey}/lock`,
          data: "Access Lock",
        },
        {
          ref: `${itemRef}/${key}/${childKey}/lockMessenger`,
          data: "File bị hạn chế truy cập !",
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
            status: 'Access Lock',
            type: item.type,
            version: item.version, 
            ref: item.ref,
            size: item.size,
            path: item.path,
            action: 'Locked',
          },
        },
      ];
    }else if(type === 'File Lock'){
      containerUpload = [
        {
          ref: `${itemRef}/${key}/${childKey}/lock`,
          data: "File Lock",
        },
        {
          ref: `${itemRef}/${key}/${childKey}/lockMessenger`,
          data: "File bị Khóa vì lỗi hoặc không chính xác !",
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
            status: 'File Lock',
            type: item.type,
            version: item.version, 
            ref: item.ref,
            size: item.size,
            path: item.path,
            action: 'Locked',
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
