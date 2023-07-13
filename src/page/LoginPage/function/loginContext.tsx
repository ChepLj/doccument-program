import { createContext, useEffect, useState } from "react";
import { ITF_AuthorLogin } from "../../../interface/interface";

const AuthContext = createContext({});

const AuthProvider = ({ children }: any) => {
  console.log("%cGoogleAuthProvider Render", "color:green");
  useEffect(() => {
    //: Unmount
    return () => {
      console.log("%cGoogleAuthProvider Unmount", "color:red");
    };
  }, []);
  const [authorLogin, setAuthorLogin] = useState<ITF_AuthorLogin | null>(null);
  // console.log("🚀 ~ file: loginContext.tsx:6 ~ authorLogin:", authorLogin);
  return (
    <AuthContext.Provider value={{ authorLogin, setAuthorLogin }}>
      {/* The rest of your app */}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
