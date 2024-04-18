import style from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext.jsx";

export default function Layout() {
  let { setToken } = useContext(UserContext);
  setToken(localStorage.getItem("token"));
  return (
    <>
      <div className={`d-flex min-vh-100 align-items-stretch ${style.dark}`}>
        <div className={`${style.sidebar}`}>
          <Sidebar />
        </div>

        <div className={`${style.content}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
