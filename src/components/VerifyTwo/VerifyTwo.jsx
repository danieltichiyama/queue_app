import React, { useState } from "react";
import Modal from "../Modal";
import styles from "./VerifyTwo.module.scss";

const VerifyTwo = (props) => {
  return (
    <div>
      <h1>Explaination with email/phone number and method</h1>
      <div>
        <input type="number" name="enteredPIN" />
      </div>
      <button onClick={props.toggleModal}>Verify PIN</button>
      <button onClick={props.verify}>Resend PIN</button>
      {props.isOpen && (
        <Modal className={styles.modal}>
          <p>Successfully verified. Thank you for verifying your business</p>
          <div>
            <button onClick={props.toggleModal}>Go to store</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default VerifyTwo;
