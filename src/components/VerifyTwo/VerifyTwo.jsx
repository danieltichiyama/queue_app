import React from "react";
import Modal from "../Modal";
import styles from "./VerifyTwo.module.scss";

const VerifyTwo = (props) => {
  return (
    <div>
      <h1>Explaination with email/phone number and method</h1>
      <form onSubmit={props.verifyPIN}>
        <div>
          <input
            type="number"
            name="enteredPIN"
            value={props.enteredPIN}
            onChange={props.handlePIN}
          />
        </div>
        <button type="submit">Verify PIN</button>
        <button onClick={props.resendPIN}>Resend PIN</button>
      </form>

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
