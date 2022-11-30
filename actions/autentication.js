import { authFirebase } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";

export const checkDataLogin = async (setIsLogin, setDataUser = () => {}) => {
  const uuid = await localStorage.getItem("UID");
  if (uuid == null) {
    setIsLogin(false);
    window.location.href = "/";
  } else {
    setIsLogin(true);
    onAuthStateChanged(authFirebase, (user) => {
      if (user) {
        setDataUser(user);
      } else {
        setIsLogin(false);
      }
    });
  }
};

export const firebaseLogout = async () => {
  localStorage.setItem("jwt-token", null);
  localStorage.setItem("UID", null);
  signOut(authFirebase);
  console.log("Signed Out");
};


export const Authentication = () => {
  const resp = localStorage.getItem("UID")
  if(resp == "null"){
    console.log(resp)
    window.location.href = "/";
  }
}