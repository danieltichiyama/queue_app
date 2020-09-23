import React from "react";
import Modal from "../Modal";
import styles from "./VerifyOne.module.scss";

const VerifyOne = (props) => {
  return (
    <div className={styles.veryfyOne}>
      <h1>Explain on how to verify and why</h1>
      <div>
        <p>Please choose a mode of contact:</p>
        <div>
          <button>Call</button>
          <button>Text</button>
          <button>Email</button>
        </div>
      </div>
      <div>
        <input
          type="text"
          value={props.contact}
          onChange={props.handleContact}
        />
      </div>
      <div>
        <button onClick={props.verify}>Send PIN</button>
        <button onClick={props.toggleModal}>Verify later</button>
      </div>
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
