
//JSX: Right side component

import { Button } from "@mui/material";
import { handelOpenTextFile } from "../../../component/FCComponent/browserFile";
import { getKeyByValue } from "../../../component/FCComponent/getKeyByValue";
import style from './RightSide.module.css'
import {MIMEtype} from "../../../component/MIMEtype";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import noImageAvailable from "../../../media/image/No_Image_Available.jpg";

export default function RightSide({ prop }: { prop: any }) {
  const arrayImageRender = [1, 2, 3, 4];
  //TODO: choose file
  const handleChooseFile = () => {
    handelOpenTextFile(prop.setFile);
  };
  //TODO_END: choose file
  //TODO: handle delete image
  const handleDeleteImage = (lineIndex: number, itemIndex: number) => {
    const newArray = prop?.[`imageArray${lineIndex}`].filter((element: any, index: number) => {
      return itemIndex !== index;
    });

    prop?.[`setImageArray${lineIndex}`](newArray);
  };
  //TODO_END: handle delete image
  return (
    <section className={style.rightSide}>
      <div className={style.rightSideFile}>
        <div className={style.rightSideFileHeader}>
          <span style={{ color: "black", fontWeight: 600, textAlign: "start" }}>File*</span>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            startIcon={<AttachFileIcon />}
            onClick={handleChooseFile}
          >
            choose file
          </Button>
        </div>
        <div style={{ color: "green", fontWeight: 600, textAlign: "start", margin: "5px" }}>
          {prop?.file?.name ? prop.file.name : "..."}
        </div>
        <div style={{ color: "gray", fontStyle: "italic", textAlign: "start", margin: "5px" }}>
          <span style={{ padding: "5px" }}>
            type: {prop?.file?.type ? getKeyByValue(MIMEtype, prop.file.type) : "..."}
          </span>
          <span style={{ padding: "5px" }}>size: {prop?.file?.size ? prop.file.size : "..."} BYTE</span>
        </div>
      </div>
      <div className={style.rightSideFile}>
        <div className={style.rightSideFileHeader}>
          <span style={{ color: "black", fontWeight: 600, textAlign: "start" }}>Image</span>
        </div>
        {arrayImageRender.map((crr, index) => {
          return (
            <section className={style.rightSideImageList} key={index}>
              {arrayImageRender.map((crrItem, indexItem) => {
                return (
                  <div className={style.rightSideImageItem} key={`${crr}-${indexItem}`}>
                    <img
                      className={style.rightSideImageItemImage}
                      alt=''
                      src={
                        prop?.[`imageArray${crr}`]?.[indexItem]
                          ? URL.createObjectURL(prop[`imageArray${crr}`][indexItem])
                          : noImageAvailable
                      }
                    />
                    <div
                      className={style.rightSideImageItemDeleteIcon}
                      onClick={() => handleDeleteImage(crr, indexItem)}
                    >
                      <HighlightOffRoundedIcon />
                    </div>
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>
    </section>
  );
}

//JSX_END: Right side component