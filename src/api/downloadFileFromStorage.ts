import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase/firebaseConfig";
import { ITF_drawingContentItem } from "../interface/interface";
import { MIMEtype } from "../component/MIMEtype";
import { getKeyByValue } from "../component/FCComponent/getKeyByValue";

export default function downloadFileFromStorage(item:ITF_drawingContentItem) {
  // Create a reference to the file we want to download
  var starsRef = ref(storage, item.urlFileStore!.fileURL);

  // Get the download URL
  getDownloadURL(starsRef).then((url) => {
    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
      const mimeType = blob.type;
      let tag = getKeyByValue(MIMEtype, mimeType)
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.target = "_blank";
      link.download = `${item.idCode}-v${item.version}-${item.name}.${tag}`;
      link.click();
    };
    xhr.open("GET", url);
    xhr.send();
  });
}
