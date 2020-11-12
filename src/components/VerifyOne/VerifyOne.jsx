import React from "react";
import Modal from "../Modal";
import styles from "./VerifyOne.module.scss";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const VerifyOne = (props) => {
  return (
    <div className={styles.verifyOne}>
      <h1>Please verify your business</h1>
      <form onSubmit={props.sendPIN}
      className = {styles.verifyContainer}>
          <p>Choose a mode of contact:</p>
          <div className={styles.contactMode}>
            <button 
              style={{background: props.verificationType === "call" ? 
              "#6d9773" : null}}
              value="call"
              type="button"
              onClick={props.handleVerificationType}
            >
              Call
            </button>
            <button
              style={{background: props.verificationType === "text" ? 
              "#6d9773" : null}}
              value="text"
              type="button"
              onClick={props.handleVerificationType}
            >
              Text
            </button>
            <button
              style={{background: props.verificationType === "email" ? 
              "#6d9773" : null}}
              value="email"
              type="button"
              onClick={props.handleVerificationType}
            >
              Email
            </button>
          </div>
          {props.verificationType === "email" ? <input placeholder="Enter email"></input> : <PhoneInput
            inputStyle={{width: "100%", height: "42px", border: " 1px solid black"}}
            buttonStyle={{border: " 1px solid black"}}
            country='us'
            onlyCountries={['us']}
            placeholder="Enter number"
            disableDropdown={true}
            jumpCursorToEnd={true}
            disableCountryCode={true}
            defaultValue={props.contact}
            onChange={props.handleContact}
          />}
          <div className={styles.submitMode}>
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
