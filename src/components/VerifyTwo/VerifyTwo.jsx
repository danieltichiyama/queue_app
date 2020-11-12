import React from "react";
import Modal from "../Modal";
import styles from "./VerifyTwo.module.scss";
import {Link} from "react-router-dom"

const VerifyTwo = (props) => {
  return (
    <div className={styles.verifyTwo}>
      <h1>Verify PIN</h1>
      <p>Please enter the PIN that was sent to your mode of contact:</p>
      <form className={styles.verifyContainer} onSubmit={props.verifyPIN}>
          <input
            type="number"
            name="enteredPIN"
            placeholder="Enter PIN"
            value={props.enteredPIN}
            onChange={props.handlePIN}
          />
        <button type="submit">Verify PIN</button>
        <button type="button" onClick={props.resendPIN}>
          Resend PIN
        </button>
      </form>

      {props.isOpen && (
        <Modal className={styles.modal}>
          <p>Successfully verified. Thank you for verifying your business</p>
          <div>
            <button><Link to='/retailerView'>Go to store</Link></button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default VerifyTwo;
