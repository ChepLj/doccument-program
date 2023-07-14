import { Box, Button, Dialog, DialogTitle, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import postDataToDB from "../../../api/postDataToDB";
import postDataToStorage from "../../../api/postDataToStorage";
import { ITF_UploadContainer } from "../../../interface/interface";
import style from "./ProgressUpload.module.css";
import { ITF_Mime, MIMEtype } from "../../../component/MIMEtype";


export default function ProgressUpload({ prop }: { prop: any }) {
  //TODO: mount
  console.log("%cProgressUpload Render", "color:green");
  useEffect(() => {
    return () => {
      console.log("%cProgressUpload Unmount", "color:red");
    };
  }, []);
  //TODO_EMD: mount
  const [state, setState] = useState("file Upload");
  console.log("🚀 ~ file: ProgressUpload.tsx:9 ~ ProgressUpload ~ state:", state);
  const [fileProgressState, setFileProgressState] = useState({ bytesTransferred: "0", totalBytes: "0" });
  const [imageBlobArray, setImageBlobArray] = useState<
    { line: number; image: any; process: { bytesTransferred: "0"; totalBytes: "0" } }[]
  >([]);
  //TODO: create new Array image
  useEffect(() => {
    const arrayTemp: any = [];
    for (let i = 0; i <= 3; i++) {
      const temp = prop?.image[i];
      for (const item of temp) {
        arrayTemp.push({ line: i + 1, image: item, process: { bytesTransferred: "0", totalBytes: "0" } });
      }
    }
    setImageBlobArray(arrayTemp);
  }, []);

  //TODO_END: create new Array image
  const data = prop?.dataObject;
  //TODO: handle upload
  useEffect(() => {
    switch (state) {
      case "file Upload": {
        const file = prop?.file;
        const temp = file.name.split('.')
        const tag = temp[temp.length -1]
        const fileName = data?.name +'.'+tag;
        const ref = `${data.groupStyle.name}/FILE/${data.idCode}/v${data.version}/`;
        const callback = (messenger: string, result: any) => {
          if (messenger === "Upload completed successfully") {
            data.urlFileStore = {fileRef: ref, fileURL: result};
            setState("image Upload");
          } else if (messenger === "Upload Failed") {
            setState("error");
          }
        };
        if (file.type === "") {
          const temp: string[] = file.name.split(".");
          const tagTemp = temp[temp.length - 1] as keyof ITF_Mime;
          const newMetadata = {
            contentType: MIMEtype[tagTemp]
          };
          postDataToStorage(file, ref, fileName, callback, setFileProgressState,newMetadata);

        }
        else{
          postDataToStorage(file, ref, fileName, callback, setFileProgressState);
        }
        break;
      }
      case "image Upload": {
        if (imageBlobArray.length === 0) {
          setState("data upload");
        } else {
          const finishArrayCheck = [];
          imageBlobArray.forEach((crr, index) => {
            const file = crr.image;
            const fileName = `Line ${crr.line} - Index ${index}`;
            const ref = `${data.groupStyle.name}/IMAGE/${data.idCode}/v${data.version}/`;
            data.detail.imageRef = ref
            const callback = (messenger: string, result: any) => {
              if (messenger === "Upload completed successfully") {
                data.detail[`line${crr.line}`].attachment.push(result);
                console.log(data.detail[`line${crr.line}`].attachment, index);

                finishArrayCheck.push(index);
                if (finishArrayCheck.length === imageBlobArray.length) {
                  setState("data upload");
                }
              } else if (messenger === "Upload Failed") {
                setState("error");
              }
            };
            const handleProgressUpload = (progressState: any) => {
              const arrayTemp = [...imageBlobArray];
              arrayTemp[index].process.bytesTransferred = progressState.bytesTransferred;
              arrayTemp[index].process.totalBytes = progressState.totalBytes;
              setImageBlobArray(arrayTemp);
            };
            postDataToStorage(file, ref, fileName, callback, handleProgressUpload);
          });
        }

        break;
      }
      case "data upload": {
        // console.log("🚀 ~ file: ProgressUpload.tsx: ~ ProgressUpload ~ data:", data);
        const typeName = data.groupStyle.name || "errorTypeKey";
        const areaId = data.areaField.id || "errorRootKey";
        const localId = data.localField.id || "errorMotherKey";
        const itemKey = `${data.idCode}`;

        const uploadContainer: ITF_UploadContainer[] = [
          {
            ref: `${typeName}/${areaId}/${localId}/${itemKey}/${itemKey}-version-${data.version}`,
            data: data,
          },
        ];
        const callback = (messenger: string) => {
          if (messenger === "post successfully!") {
            setState("done");
          } else if (messenger === "Upload Failed") {
            setState("error");
          }
        };
        postDataToDB(uploadContainer, callback);
        break;
      }
      case "done": {
        break;
      }
      case "error": {
        alert("Something is wrong, Upload failed !!!");
        break;
      }
    }
  }, [state]);

  //TODO_END: handle upload
  return (
    <section className={style.container}>
      <div className={style.content}>
        <header className={style.header}>
          {state !== "done" ? (
            <>
              <h3 className={style.titleHeader}>Data is on upload progress. please wait !!!</h3>
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            </>
          ) : (
            <h3 className={style.titleHeader}>Data upload is done !!!</h3>
          )}
        </header>
        <div className={style.item}>
          <div className={style.itemChild}>
            <span className={style.itemChildTitle}>IdCode: </span>
            <span>{data?.idCode}</span>
          </div>
          <div className={style.itemChild}>
            <span className={style.itemChildTitle}>Name: </span>
            <span>{data?.name}</span>
          </div>
          <div className={style.itemChild}>
            <span className={style.itemChildTitle}>Version: </span>
            <span>{data?.version}</span>
          </div>
          <div className={style.itemChild}>
            <span className={style.itemChildTitle}>Group: </span>
            <span>{data?.groupField.name}</span>
          </div>
          <div className={style.itemChild}>
            <span className={style.itemChildTitle}>Path: </span>
            <span>{`${data?.groupStyle.name}/${data?.areaField.name}/${data?.localField.name}/`}</span>
          </div>

          <div className={style.itemChild}>
            <span className={style.itemChildTitle}>Author: </span>
            <span>{data?.author}</span>
          </div>
        </div>
        <div className={style.item}>
          <div className={style.itemChildTitle}>File</div>
          <div className={style.listItem}>
            <span className={style.listItemText}>
              &diams;
              {prop?.file?.name}
            </span>
            <span className={style.listItemData}>
              {fileProgressState?.bytesTransferred}/{fileProgressState?.totalBytes} Byte
            </span>
          </div>
        </div>
        <div className={style.item}>
          <div className={style.itemChildTitle}>Image</div>
          {imageBlobArray.map((crr, index) => {
            return (
              <div className={style.listItem} key={index}>
                <span className={style.listItemText}>
                  &diams;
                  {`Line ${crr.line} - Index ${index}`}
                </span>
                <span className={style.listItemData}>
                  {crr.process?.bytesTransferred}/{crr.process?.totalBytes} Byte
                </span>
              </div>
            );
          })}
        </div>
        <div className={style.item}>
          <div className={style.itemChildTitle}>Data</div>
          {state === "done" ? (
            <div className={style.listItem}>upload done</div>
          ) : (
            <div className={style.listItem}>waiting upload ...</div>
          )}
        </div>
        <Dialog open={state === "done"} fullWidth>
          <DialogTitle>Data upload is done !!!</DialogTitle>
          <div  className={style.doneButton}>
            <Button
              variant="contained"
              sx={{ m: 1 , width:'300px'}}
              onClick={() => {
                window.location.replace("/");
              }}
            >
              Back to Home
            </Button>
            <Button variant="contained" color="success" sx={{ m: 1 , width:'300px'}}
            onClick={()=>{
              const state = data.ref
              window.history.pushState([...state.split('/'),'direct'],'','/')
              window.location.href = '/'
              
            }}
            >
              Show new item uploaded
            </Button>
          </div>
        </Dialog>
      </div>
    </section>
  );
}
