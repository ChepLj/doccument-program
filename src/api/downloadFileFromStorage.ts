import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase/firebaseConfig";
import { ITF_drawingContentItem } from "../interface/interface";
import { MIMEtype } from "../component/MIMEtype";
import { getKeyByValue } from "../component/FCComponent/getKeyByValue";
import getDataFromDB from "./getDataFromDB";
import * as fs from "fs";
import * as https from "https";
export default function downloadFileFromStorage(item: ITF_drawingContentItem) {
  // //TODO: handel download
  // const handelDownload = () => {
  //   // Create a reference to the file we want to download
  //   var starsRef = ref(storage, item.urlFileStore!.fileURL);

  //   // Get the download URL
  //   getDownloadURL(starsRef).then((url) => {
  //     // This can be downloaded directly:
  //     const xhr = new XMLHttpRequest();
  //     xhr.responseType = "blob";
  //     xhr.onload = (event) => {
  //       const blob = xhr.response;
  //       const mimeType = blob.type;
  //       let tag = getKeyByValue(MIMEtype, mimeType);
  //       const link = document.createElement("a");
  //       link.href = window.URL.createObjectURL(blob);
  //       link.target = "_blank";
  //       link.download = `${item.idCode}-v${item.version}-${item.name}.${tag}`;
  //       link.click();
  //     };
  //     xhr.open("GET", url);
  //     xhr.send();
  //   });
  // };

  // //TODO END: handel download
  //TODO: handel download NEW

  const handelDownload = () => {
    const fileReference = ref(storage, item.urlFileStore!.fileURL); // Replace with the path to your file

    getDownloadURL(fileReference)
      .then((url) => {
        // Create a link to download the file
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.target = "_blank"; // Open in a new tab
        // downloadLink.download = "downloaded_file.jpg"; // Specify the desired file name

        // Trigger the download
        downloadLink.click()
        
      })
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  };

  //TODO_END: handel download NEW

  // Check large file
  const maxFileDownloadSize = 80000000;
  if (item?.size! > maxFileDownloadSize) {
    const promptInput = prompt(`Kích thước File tải xuống tối đa là ${maxFileDownloadSize} byte. \nNếu vẫn muốn tải xuống File kích thước lớn hơn, nhập mã code Download Large File bên dưới !`);
    //TODO: Get Download Large File Code
    const ref = `CODE/`;
    const callback = (result: any) => {
      if (result.type === "SUCCESSFUL") {
        const code = result.payload.LargeFileDownloadCode;
        if (code === promptInput) {
          handelDownload();
        } else {
          alert("Sai mật mã. Nhập lại !");
        }
      } else {
        alert("something is wrong! can not get data");
      }
    };
    getDataFromDB(ref, callback);

    //TODO_ENd: Get Download Large File Code
  } else {
    handelDownload();
  }
}
