import deleteFolderDataFromStorage from "../../api/deleteFolderDataFromStorage";
import { database } from "../../api/firebase/firebaseConfig";
import { ref, remove } from "firebase/database";
import { ITF_drawingContentItem } from "../../interface/interface";
import postDataToDB from "../../api/postDataToDB";
import getDataFromDB from "../../api/getDataFromDB";

export default function handleDeleteData(refInput: string, item: ITF_drawingContentItem, mainPageContext: any, authorLogin: any) {

  const deleteProgress = (state: string) => {
    switch (state) {
      case "fileDelete": {
        //delete file
        const fileDeleteCallback = (messenger: string) => {
          if (messenger === "delete successfully") {
            deleteProgress("imageDelete");
          } else {
            alert("Something is wrong !");
            return;
          }
        };
        const fileRef = item.urlFileStore!.fileRef;
        deleteFolderDataFromStorage(fileRef, fileDeleteCallback);
        break;
      }
      case "imageDelete": {
        //delete image
        const fileDeleteCallback = (messenger: string) => {
          if (messenger === "delete successfully") {
            deleteProgress("dataDelete");
          } else {
            alert("Something is wrong !");
            return;
          }
        };
        const fileRef = item.detail!.imageRef;
        deleteFolderDataFromStorage(fileRef, fileDeleteCallback);
        break;
      }
      case "dataDelete": {
        const reference = ref(database, refInput);
        remove(reference)
          .then(() => {
            let containerUpload: any = [];
            const currentTimeInMilliseconds = Date.now().toString();
            containerUpload = [
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
                  status: "Deleted",
                  type: item.type,
                  version: item.version,
                  ref: item.ref,
                  size: item.size,
                  path: item.path,
                  action: "Deleted",
                },
              },
            ];
            if (item.status == "Waiting for approve") {
              containerUpload.push({
                ref: `LOGS/WaitingForApprove/${item.logsKey}`,
                data: null,
              });
            }
            if (maxVersion != "00") {
              containerUpload.push({
                ref: `${item.ref}/${item.idCode}/${item.idCode}-version-${maxVersion}/status/`,
                data: "Current",
              });
            }
            //TODO: handle Post Logs
            const handlePostLogs = () => {
              const callback = (result: string) => {
                if (result === "post successfully!") {
                  window.history.pushState(refInput.split("/"), "", "/");
                  mainPageContext.setRefreshState(Math.random()); //: reload lai trang
                } else {
                  alert("something is wrong, can not approve !");
                }
              };
              postDataToDB(containerUpload, callback);
            };
            //TODO_END: handle Post Logs
            handlePostLogs();
          })
          .catch(() => alert("something is wrong ! can not delete this item ."));
        break;
      }
    }
  };
    //TODO: handle OldRelease to Current
    let maxVersion = "00";
    const handleOldReleaseToCurrent = () => {
      if (item.status == "Current") {
        const ref = `${item.ref}/${item.idCode}/`;
        const callback = (result: any) => {
          if (result.type === "SUCCESSFUL") {
            const versions: number[] = [];
            const itemList = result.payload;
            for (const key in itemList) {
              const versionTemp = +itemList[key].version;
              const currentVersion = item.version ? +item.version : 0;
              if (versionTemp != currentVersion) {
                versions.push(versionTemp);
              }
            }
  
            if (versions.length) {
              const maxVersionTemp = Math.max(...versions);
              maxVersion = maxVersionTemp >= 10 ? maxVersionTemp.toString() : `0${maxVersionTemp}`;
            }
  
            //goi 1 lan de run
            deleteProgress("fileDelete");
          } else {
            alert("something is wrong! can not get data");
          }
        };
        getDataFromDB(ref, callback);
      } else {
        //goi 1 lan de run
        deleteProgress("fileDelete");
      }
    };
    handleOldReleaseToCurrent(); //call
    //TODO_END: handle OldRelease to Current
}
