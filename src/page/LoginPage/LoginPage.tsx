import { useContext, useState } from "react";
import getAuthorFromAccountDB from "./function/getAuthorFromAccountDB";
import { AuthContext } from "./function/loginContext";
import documentIcon from "../../media/image/doccument-Icon.png";
import style from "./LoginLayout.module.css";
import checkPermission from "./function/checkPermission";
import { decryptCrypto, encryptCrypto } from "../../component/FCComponent/crypto";

const LoginPage = () => {
  const { setAuthorLogin } = useContext<any>(AuthContext);
  const [isToastOpen, setIsToastOpen] = useState<{ isOpen: boolean; messenger?: string }>({ isOpen: false });

  //TODO: handle toast
  const handleToast = (input: any) => {
    setIsToastOpen(input);
    setTimeout(() => {
      setIsToastOpen({ isOpen: false });
    }, 5000);
  };
  //TODO_END: handle toast
  const handelManualLogin = () => {
    const userNameElm = document.querySelector('input[name="login-username"]') as HTMLInputElement;
    const passwordElm = document.querySelector('input[name="login-password"]') as HTMLInputElement;
    //TODO: Dispatch when got User
    const handelManualLoginFirebaseUser = ({ type, payload }: { type: string; payload: any }) => {
      if (type === "SUCCESSFUL") {
        let isMatching = false;
        for (const key in payload) {
          if (userNameElm?.value === key) {
            if (passwordElm?.value == payload?.[key].password) {
              if (payload?.[key]?.level === "lock") {
                handleToast({ isOpen: true, messenger: "Tài khoản này đã bị khóa! Liên hệ Mr.Sỹ để biết thêm chi tiết !" });
              } else {
                const authLoginTemp = payload?.[key];
                if(checkPermission(authLoginTemp.app)){                 
                  sessionStorage.setItem('authorLogin', encryptCrypto(authLoginTemp))
                  setAuthorLogin(authLoginTemp);
                }
                else{
                  handleToast({ isOpen: true, messenger: "Tài khoản này chưa được cấp phép hoặc bị chặn truy cập ứng dụng này ! Liên hệ Mr.Sỹ để biết thêm chi tiết !" });
                }

              }
            } else {
              handleToast({ isOpen: true, messenger: "Sai mật khẩu" });
            }
            isMatching = true;
            break;
          }
        }
        {
          !isMatching && handleToast({ isOpen: true, messenger: "Tài khoản không tồn tại !" });
        }
      }
      //TODO_END: Dispatch when got User
    };

    if (userNameElm.value) {
      const childRef = "User/";
      getAuthorFromAccountDB(childRef, handelManualLoginFirebaseUser);
    }
  };
  ////////////////

  return (
    <section className={style.mainContainer}>
      <header className={style.header}>
        <div className={style.headerItem}>Login</div>
      </header>
      <section className={style.contentContainer}>
        <img className={style.icon} src={documentIcon} />
        <div className={style.inputContainer}>
          <div className={style.item}>
            <span className={style.itemLabel}>User Name</span>
            <input className={style.itemInput} placeholder="Enter id" name="login-username"></input>
          </div>
          <div className={style.item}>
            <span className={style.itemLabel}>Password</span>
            <input
              className={style.itemInput}
              placeholder="Enter password"
              name="login-password"
              onKeyUp={(e) => {
                if (e.code === "Enter") {
                  handelManualLogin();
                }
              }}
            ></input>
          </div>
        </div>
        <button className={style.button} onClick={handelManualLogin}>
          Login
        </button>

        {isToastOpen.isOpen && <div className={style.toast}>{isToastOpen.messenger}</div>}
      </section>
    </section>
  );
};

export default LoginPage;
