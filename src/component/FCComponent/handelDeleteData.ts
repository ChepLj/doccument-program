import deleteFolderDataFromStorage from "../../api/deleteFolderDataFromStorage";
import { database } from "../../api/firebase/firebaseConfig";
import { ref, remove } from "firebase/database";
import { ITF_drawingContentItem } from "../../interface/interface";

export default function handleDeleteData(refInput: string, item: ITF_drawingContentItem, mainPageContext: any) {
  const deleteProgress = (state: string) => {
    console.log("🚀 ~ file: handelDeleteData.ts:9 ~ deleteProgress ~ state:", state)
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
            window.history.pushState(refInput.split("/"), "", "/");
            mainPageContext.setRefreshState(Math.random());
          })
          .catch(() => alert("something is wrong ! can not delete this item ."));
          break;
      }
    }
  };
  //goi 1 lan de run
  deleteProgress("fileDelete")
}
