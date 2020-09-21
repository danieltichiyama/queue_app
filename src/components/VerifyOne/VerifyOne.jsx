import React from "react";
import VerifyLaterModal from "./VerifyLaterModal";
import styles from "./VerifyOne.module.scss";

const VerifyOne = (props) => {
  return (
    <div className={styles.veryfyOne}>
      <h1>Explain on how to verify and why</h1>
      <div>
        Please choose a mode of contact:
        <button>Call</button>
        <button>Text</button>
        <button>Email</button>
      </div>
      <input type="text" />
      <div>
        <button onClick={props.changeStep}>Send PIN</button>
        <button>verify later</button>
      </div>
      <VerifyLaterModal />
    </div>
  );
};

export default VerifyOne;
