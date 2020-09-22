import React, { useState } from "react";
import VerifyLaterModal from "../VerifyOne/VerifyLaterModal";
import styles from "./VerifyTwo.module.scss";

const VerifyTwo = (props) => {
  return (
    <div>
      <h1>Explaination with email/phone number and method</h1>
      <div>
        <input type="number" name="enteredPIN" />
      </div>
      <button onClick={props.toggleModal}>Verify PIN</button>
      <button onClick={props.changeStep}>Resend PIN</button>
      {props.isOpen && (
        <VerifyLaterModal
          className={styles.modal}
          isOpen={props.isOpen}
          toggleModal={props.toggleModal}
        ></VerifyLaterModal>
      )}
    </div>
  );
};

export default VerifyTwo;
