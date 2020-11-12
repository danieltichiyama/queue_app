import React from "react";
import styles from "./Modal.module.scss";

const Modal = (props) => {
  return ( <div className={styles.modal}>
    <div className={styles.modalBody}>{this.props.children}</div>
  </div> );
}
 
export default Modal;
