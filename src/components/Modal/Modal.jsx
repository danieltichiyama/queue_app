import React, { Component } from "react";
import styles from "./Modal.module.scss";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.modal}>
        <div className={styles.modalBody}>{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
