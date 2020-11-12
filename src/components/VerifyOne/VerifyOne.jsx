import React from "react";
import Modal from "../Modal";
import styles from "./VerifyOne.module.scss";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const VerifyOne = (props) => {
  return (
    <div className={styles.veryfyOne}>
      <h1>Explain on how to verify and why</h1>
      <form onSubmit={props.sendPIN}>
        <div>
          <p>Please choose a mode of contact:</p>
          <div>
            <button
              value="call"
              type="button"
              onClick={props.handleVerificationType}
            >
              Call
            </button>
            <button
              value="text"
              type="button"
              onClick={props.handleVerificationType}
            >
              Text
            </button>
            <button
              value="email"
              type="button"
              onClick={props.handleVerificationType}
            >
              Email
            </button>
          </div>
        </div>
        <div>
          <PhoneInput
            className={styles.flagDropdown}
            country='us'
            onlyCountries={['us']}
            placeholder="Enter number"
            disableDropdown={true}
            jumpCursorToEnd={true}
            disableCountryCode={true}
            defaultValue={props.contact}
            onChange={props.handleContact}
          />
        </div>
        <div>
          <button type="submit">Send PIN</button>
          <button type="button" onClick={props.toggleModal}>
            Verify later
          </button>
        </div>
      </form>

      {props.isOpen && (
        <Modal className={styles.modal}>
          <p>
            If you verify later, your business will not show up in search
            results!
          </p>
          <div>
            <button onClick={props.toggleModal}>Verify now</button>
            <button>Verify Later</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default VerifyOne;
