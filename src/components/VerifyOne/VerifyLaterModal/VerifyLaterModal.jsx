import React from "react";
import styles from "./VerifyLaterModal.module.scss";

const VerifyLaterModal = (props) => {
  return (
    <div className={props.isOpen ? styles.modal : null}>
      <div className={styles.modalBox}>
        <p>{props.message}</p>
        {props.children}
      </div>
    </div>
  );
};

export default VerifyLaterModal;
