
import postDataToDB from "../../api/postDataToDB";

export default function handleApprove(childKey: string, key: string, itemRef: string, itemList: any, mainPageContext: any, authorLogin:any) {
  let currentKey = "";
  for (const key in itemList) {
    if (itemList[key].status === "Current") {
      currentKey = key;
    }
  }

  let containerUpload: any = [];
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
    ];
  } else {
    containerUpload = [
      {
        ref: `${itemRef}/${key}/${childKey}/status`,
        data: "Current",
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
