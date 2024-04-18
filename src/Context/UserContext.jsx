import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext(0);

export default function UserContextProvider({ children }) {
  let [token, setToken] = useState(localStorage.getItem("token"));

  async function sendDataToSignUp(values) {
    const res = await axios.post(
      "https://note-sigma-black.vercel.app/api/v1/users/signUp",
      values
    );
    return res;
  }

  async function sendDataToLogin(values) {
    const { data } = await axios.post(
      "https://note-sigma-black.vercel.app/api/v1/users/signIn",
      values
    );
    console.log(data);
    return data;
  }

  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <UserContext.Provider
      value={{ sendDataToSignUp, sendDataToLogin, token, setToken, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
}
