import React from "react";
import VerifyLaterModal from "./VerifyLaterModal";
import styles from "./VerifyOne.module.scss";

const VerifyOne = (props) => {
  return (
    <div className={styles.veryfyOne}>
      <h1>Explain on how to verify and why</h1>
      <div>
        Please choose a mode of contact:
        <div>
          <button>Call</button>
          <button>Text</button>
          <button>Email</button>
        </div>
      </div>
      <input type="text" />
      <div>
        <button onClick={props.changeStep}>Send PIN</button>
        <button onClick={props.toggleModal}>verify later</button>
      </div>
      {props.isOpen && (
        <VerifyLaterModal
          className={styles.modal}
          isOpen={props.isOpen}
          toggleModal={props.toggleModal}
        />
      )}
    </div>
  );
};

export default VerifyOne;
