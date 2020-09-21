import React from "react";
import styles from "./VerifyLaterModal.module.scss";

const VerifyLaterModal = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalBox}>
        <p>Will not be shown on searches if verify later.</p>
      </div>
    </div>
  );
};

export default VerifyLaterModal;
