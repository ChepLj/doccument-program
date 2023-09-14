import AddIcon from "@mui/icons-material/Add";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { Button, ListItem, Popover, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import downloadFileFromStorage from "../../../../api/downloadFileFromStorage.ts";
import getDataFromDB from "../../../../api/getDataFromDB.ts";
import handleDeleteData from "../../../../component/FCComponent/handelDeleteData.ts";
import handleApprove from "../../../../component/FCComponent/handleApprove.ts";
import handleLock from "../../../../component/FCComponent/handleLock.ts";
import handleUnlock from "../../../../component/FCComponent/handleUnlock.ts";
import { ITF_ObjFilter, ITF_ObjFilterArray, ITF_drawingContent, ITF_drawingContentItem } from "../../../../interface/interface.ts";
import { AuthContext } from "../../../LoginPage/function/loginContext.tsx";
import { MainPageContext } from "./../../MainPage";
import style from "./ViewPort1.module.css";

export default function ViewPort1({ rightSideContentData, handelDirectViewPort2 }: { rightSideContentData: ITF_drawingContent; handelDirectViewPort2: Function }) {
  // console.log("🚀 ~ file: ViewPort1.tsx:22 ~ rightSideContentData:", rightSideContentData);
  console.log("%cViewPort1 Page mount", "color:green");
  useEffect(() => {
    //: Unmount
    return () => {
      console.log("%cViewPort1 Page Unmount", "color:red");
    };
  }, []);

  try {
    //TODO: handle data
    const resultArray: any[] = [];
    const handleData = () => {
      const objFilter: ITF_ObjFilter = {
        "01": {
          New: [],
          Current: [],
        },
        "02": {
          New: [],
          Current: [],
        },
        "03": {
          New: [],
          Current: [],
        },
        "04": {
          New: [],
          Current: [],
        },
        "05": {
          New: [],
          Current: [],
        },
      };
      for (const key in rightSideContentData) {
        const keyTemp = key as keyof ITF_drawingContent;
        const itemTemp: ITF_drawingContent = rightSideContentData[keyTemp];
        for (const keyChild in itemTemp) {
          const keyChildTemp = keyChild as keyof ITF_drawingContent;
          const itemChildTemp: ITF_drawingContentItem = itemTemp[keyChildTemp];

          switch (itemChildTemp.groupField?.id) {
            case "01": {
              if (itemChildTemp.status === "Waiting for approve") {
                objFilter["01"].New.push({ key: keyTemp, keyChild: keyChild });
              } else if (itemChildTemp.status === "Current") {
                objFilter["01"].Current.push({ key: keyTemp, keyChild: keyChild });
              }
              objFilter["01"].groupName = itemChildTemp.groupField.name;
              break;
            }
            case "02": {
              if (itemChildTemp.status === "Waiting for approve") {
                objFilter["02"].New.push({ key: keyTemp, keyChild: keyChild });
              } else if (itemChildTemp.status === "Current") {
                objFilter["02"].Current.push({ key: keyTemp, keyChild: keyChild });
              }
              objFilter["02"].groupName = itemChildTemp.groupField.name;
              break;
            }
            case "03": {
              if (itemChildTemp.status === "Waiting for approve") {
                objFilter["03"].New.push({ key: keyTemp, keyChild: keyChild });
              } else if (itemChildTemp.status === "Current") {
                objFilter["03"].Current.push({ key: keyTemp, keyChild: keyChild });
              }
              objFilter["03"].groupName = itemChildTemp.groupField.name;
              break;
            }
            case "04": {
              if (itemChildTemp.status === "Waiting for approve") {
                objFilter["04"].New.push({ key: keyTemp, keyChild: keyChild });
              } else if (itemChildTemp.status === "Current") {
                objFilter["04"].Current.push({ key: keyTemp, keyChild: keyChild });
              }
              objFilter["04"].groupName = itemChildTemp.groupField.name;
              break;
            }
            case "05": {
              if (itemChildTemp.status === "Waiting for approve") {
                objFilter["05"].New.push({ key: keyTemp, keyChild: keyChild });
              } else if (itemChildTemp.status === "Current") {
                objFilter["05"].Current.push({ key: keyTemp, keyChild: keyChild });
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

        if (objectTemp.New.length !== 0 || objectTemp.Current.length !== 0) {
          const objTemp = objectTemp;
          objTemp.id = item;
          resultArray.push(objTemp);
        }
      }
      return resultArray;
    };
    const arrayRenderTemp = handleData();

    //TODO_END: handle data
    //TODO: handle create new from group
    const handleCreateNewFromGroup = (groupField: any) => {
      const locationState = window.history.state;
      console.log("🚀 ~ file: ViewPort1.tsx:131 ~ handleCreateNewFromGroup ~ locationState:", locationState);
      if (locationState.length >= 3) {
        const stateProp = {
          groupStyle: { name: locationState[0] },
          areaField: { id: locationState[1] },
          localField: { id: locationState[2] },
          idCode: "Create New",
          groupField: groupField,
        };
        window.history.pushState({ stateProp }, "", "/create");
        window.location.href = "/create";
      }
    };
    //TODO_END: handle create new from group
    return (
      <section className={style.mainContainer}>
        <div className={style.group}>
          {arrayRenderTemp.map((motherCrr, motherIndex) => {
            return (
              <div key={motherIndex}>
                <div className={style.titleGroup}>
                  <div>{`${motherCrr.id} - ${motherCrr.groupName}`}</div>
                  <Button variant="text" endIcon={<AddIcon />} size="small" color="info" onClick={() => handleCreateNewFromGroup({ id: motherCrr.id, name: motherCrr.groupName })}>
                    Add New
                  </Button>
                </div>
                {motherCrr.New.length > 0 && <NewDrawing motherCrr={motherCrr} rightSideContentData={rightSideContentData} handelDirectViewPort2={handelDirectViewPort2} />}
                {motherCrr.Current.length > 0 && <CurrentDrawing motherCrr={motherCrr} rightSideContentData={rightSideContentData} handelDirectViewPort2={handelDirectViewPort2} />}
              </div>
            );
          })}
        </div>
      </section>
    );
  } catch (error) {
    const errorMessenger = error? error.toString(): "Nothing to show !"
    return  (
    <>
      <h1>Something is wrong ! try Reload Page or contact Mr.Sy</h1>
      <p>{errorMessenger}</p>
    </>
    )
  }
}

//JSX: New Drawing

function NewDrawing({ motherCrr, rightSideContentData, handelDirectViewPort2 }: { motherCrr: ITF_ObjFilterArray; rightSideContentData: ITF_drawingContent; handelDirectViewPort2: Function }) {
  const mainPageContext = useContext<any>(MainPageContext);
  const { authorLogin } = useContext<any>(AuthContext);
  //TODO: handle delete data
  const handleDeleteNewDrawing = (ref: string, item: any) => {
    const promptInput = prompt(`Nhập  ${item.idCode}   để xóa !`);
    if (promptInput == item.idCode) {
      handleDeleteData(ref, item, mainPageContext, authorLogin);
    } else {
      alert(`Sai mã bản vẽ. nhập lại !`);
    }
  };
  //TODO_END: handle delete data

  return (
    <ul>
      <span className={style.titleList}>New: (waiting for approve)</span>
      {motherCrr.New.reverse().map((groupCrr: { key: string; keyChild: string }, groupIndex: number) => {
        const key = groupCrr.key as keyof ITF_drawingContent;
        const keyChild = groupCrr.keyChild as keyof ITF_drawingContent;
        const item: ITF_drawingContentItem = rightSideContentData[key][keyChild];
        return (
          <li className={style.listItem} key={groupIndex}>
            <div className={style.leftItem}>
              <span className={style.idCode}>{item.idCode}</span>
              <AttachFileIcon fontSize="small" color="warning" />
              <a className={style.name} onClick={() => handelDirectViewPort2(groupCrr)}>
                {item.name}
              </a>
            </div>
            <Stack direction="row" spacing={1} style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "10px", fontStyle: "italic", color: "gray" }}>{`( ${item.author!.split(" ").pop()} )`}</span>

              {(authorLogin.level === "admin" || authorLogin.app.documentProgram.appLevel === "admin") && (
                <Button
                  variant="outlined"
                  startIcon={<HowToRegIcon />}
                  size="small"
                  color="secondary"
                  onClick={() => {
                    const itemRef: any = item.ref;
                    const itemList = rightSideContentData[key];
                    const itemLogsKey = item?.logsKey ? item.logsKey : "none";
                    handleApprove(keyChild, key, itemRef, itemList, mainPageContext, authorLogin, itemLogsKey, item);
                  }}
                >
                  Approve
                </Button>
              )}
              <Button variant="outlined" startIcon={<DownloadIcon />} size="small" onClick={() => downloadFileFromStorage(item)}>
                Download
              </Button>
              <Button variant="outlined" startIcon={<EditIcon />} size="small" color="info" disabled style={{ minWidth: "95px" }}>
                Edit
              </Button>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                size="small"
                color="error"
                disabled={!(authorLogin.level === "admin" || authorLogin.app.documentProgram.appLevel === "admin") && item.authorId !== authorLogin.userName}
                onClick={() => {
                  const itemRef = `${item.ref}/${key}/${keyChild}`;
                  handleDeleteNewDrawing(itemRef, item);
                }}
              >
                delete
              </Button>
            </Stack>
          </li>
        );
      })}
    </ul>
  );
}
//JSX_END: New Drawing

//JSX: Current Drawing

function CurrentDrawing({ motherCrr, rightSideContentData, handelDirectViewPort2 }: { motherCrr: ITF_ObjFilterArray; rightSideContentData: ITF_drawingContent; handelDirectViewPort2: Function }) {
  // console.log("🚀 ~ file: ViewPort1.tsx:236 ~ CurrentDrawing ~ rightSideContentData:", rightSideContentData)
  const mainPageContext = useContext<any>(MainPageContext);
  const { authorLogin } = useContext<any>(AuthContext);
  //TODO: handle lock popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleLockPopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLockPopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //TODO_END: handle lock popover
  //TODO: handle delete data
  const handleDeleteCurrentDrawing = (ref: string, item: any) => {
    const promptInput = prompt(`File này đang là Current, nếu xóa thì phiên bản trước đó sẽ tự động chuyển thành Current ! \nNhập  ${item.idCode}   để xóa !`);
    if (promptInput == item.idCode) {
      handleDeleteData(ref, item, mainPageContext, authorLogin);
    } else {
      alert(`Sai mật mã. nhập lại !`);
    }
  };
  //TODO_END: handle delete data
  //TODO: handle download lock data
  const handleDownloadLockData = (item: ITF_drawingContentItem) => {
    const promptInput = prompt(`Bạn không thể Download file này vì : ${item.lockMessenger} \nNếu vẫn muốn Download , hãy nhập mật mã ${item.lock}`);
    //TODO: Get Logs
    const ref = `CODE/`;
    const callback = (result: any) => {
      if (result.type === "SUCCESSFUL") {
        const code = result.payload;
        let codeInputCheck = false;
        const handleFunction = () => {
          downloadFileFromStorage(item);
          codeInputCheck = true;
        };
        switch (item.lock) {
          case "Access Lock": {
            promptInput == code.AccessLockCode && handleFunction();
            break;
          }
          case "File Lock": {
            promptInput == code.FileLockCode && handleFunction();
            break;
          }
          default: {
            alert(`Can't get code from sever !`);
          }
        }
        !codeInputCheck && alert(`Sai mật mã. nhập lại !`);
      } else {
        alert("something is wrong! can not get data");
      }
    };
    getDataFromDB(ref, callback);

    //TODO_ENd: Get Logs
  };
  //TODO_END: handle download lock data
  //TODO: handle direct to create page
  const handleDirectToCreatePage = (item: ITF_drawingContentItem) => {
    const key = item.idCode as keyof ITF_drawingContent;
    const objectTemp: any = rightSideContentData[key];
    for (const key in objectTemp) {
      if (objectTemp[key].status === "Waiting for approve") {
        return alert(`Phiên bản v${objectTemp[key].version}  của  ${objectTemp[key].idCode}  đang chờ được phê duyệt !!!`);
      }
    }
    window.history.pushState({ stateProp: item }, "", "/create");
    window.location.href = "/create";
  };
  //TODO_END: handle direct to create page

  return (
    <ul>
      <span className={style.titleList}>Current:</span>
      {motherCrr.Current.reverse().map((groupCrr: { key: string; keyChild: string }, groupIndex: number) => {
        const key = groupCrr.key as keyof ITF_drawingContent;
        const keyChild = groupCrr.keyChild as keyof ITF_drawingContent;
        const item: ITF_drawingContentItem = rightSideContentData[key][keyChild];
        return (
          <li className={style.listItem} key={groupIndex}>
            <div className={style.leftItem}>
              <span className={style.idCode}>{item.idCode}</span>
              <AttachFileIcon fontSize="small" color="warning" />
              <a className={style.name} onClick={() => handelDirectViewPort2(groupCrr)}>
                {item.name}
              </a>
            </div>
            <Stack direction="row" spacing={1} style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "10px", fontStyle: "italic", color: "gray" }}>{`( ${item.author!.split(" ").pop()} )`}</span>
              {(authorLogin.level === "admin" || authorLogin.app.documentProgram.appLevel === "admin") && (
                <>
                  <Button
                    aria-describedby={id}
                    variant="outlined"
                    startIcon={item.lock ? <LockOpenIcon /> : <LockIcon />}
                    size="small"
                    color="warning"
                    onClick={(e) => {
                      const itemRef: any = item.ref;
                      item.lock ? handleUnlock(keyChild, key, itemRef, mainPageContext, authorLogin, item) : handleLockPopoverClick(e);
                    }}
                  >
                    {item.lock ? "Unlock" : "Lock"}
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleLockPopoverClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <ListItem
                      className={style.lockPopoverItem}
                      onClick={() => {
                        const itemRef: any = item.ref;
                        handleLock("Access Lock", keyChild, key, itemRef, mainPageContext, authorLogin, item);
                      }}
                    >
                      Access Lock
                    </ListItem>
                    <ListItem
                      className={style.lockPopoverItem}
                      onClick={() => {
                        const itemRef: any = item.ref;
                        handleLock("File Lock", keyChild, key, itemRef, mainPageContext, authorLogin, item);
                      }}
                    >
                      File Lock
                    </ListItem>
                  </Popover>
                </>
              )}
              {item.lock ? (
                <Button variant="outlined" startIcon={<BlockIcon />} size="small" color="error" onClick={() => handleDownloadLockData(item)}>
                  Locked
                </Button>
              ) : (
                <Button variant="outlined" startIcon={<DownloadIcon />} size="small" onClick={() => downloadFileFromStorage(item)}>
                  Download
                </Button>
              )}

              <Button
                variant="outlined"
                startIcon={<UpgradeIcon />}
                size="small"
                color="warning"
                disabled={item.authorId !== authorLogin.userName}
                onClick={() => handleDirectToCreatePage(item)}
                style={{ minWidth: "95px" }}
              >
                Update
              </Button>

              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                size="small"
                color="error"
                disabled={!(authorLogin.level === "admin" || authorLogin.app.documentProgram.appLevel === "admin")}
                onClick={() => {
                  const itemRef = `${item.ref}/${key}/${keyChild}`;
                  handleDeleteCurrentDrawing(itemRef, item);
                }}
              >
                delete
              </Button>
            </Stack>
          </li>
        );
      })}
    </ul>
  );
}
//JSX_END: Current Drawing
