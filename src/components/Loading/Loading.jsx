import React from "react";
import style from "./Loading.module.css";

export default function Loading() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className={style["lds-facebook"]}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
