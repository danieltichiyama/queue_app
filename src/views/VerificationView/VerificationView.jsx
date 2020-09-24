import React, { Component } from "react";
import { connect } from "react-redux";
import VerifyOne from "../../components/VerifyOne";
import VerifyTwo from "../../components/VerifyTwo";

class VerificationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayComponent: "first",
      isOpen: false,
      verificationType: "call",
      contact: "",
      enteredPIN: 0,
    };
    this.handlePIN = this.handlePIN.bind(this);
    this.handleContact = this.handleContact.bind(this);
    this.sendPIN = this.sendPIN.bind(this);
  }

  sendPIN = (e) => {
    e.preventDefault();
    let { displayComponent, verificationType, contact } = this.state;
    let sendPINForm = {
      verificationType,
      contact,
    };
    this.setState({
      displayComponent: displayComponent === "first" ? "second" : "first",
    });
    console.log(
      "To be sent to api/verification/:retailerId/send ",
      sendPINForm
    );
  };

  verifyPIN = (e) => {
    e.preventDefault();
    let { enteredPIN } = this.state;
  };

  resendPIN = (e) => {
    let { displayComponent } = this.state;
    this.setState({
      displayComponent: displayComponent === "first" ? "second" : "first",
    });
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleContact = (e) => {
    this.setState({ contact: e.target.value });
    console.log(this.state.contact);
  };

  handlePIN = (e) => {
    this.setState({ enteredPIN: e.target.value });
  };

  handleVerificationType = (e) => {
    this.setState({ verificationType: e.target.value });
  };

  renderVerificationStep() {
    let { displayComponent, isOpen, contact, enteredPIN } = this.state;

    if (displayComponent === "first") {
      return (
        <VerifyOne
          display={displayComponent}
          toggleModal={this.toggleModal}
          isOpen={isOpen}
          sendPIN={this.sendPIN}
          contact={contact}
          handleContact={this.handleContact}
          handleVerificationType={this.handleVerificationType}
        />
      );
    } else if (displayComponent === "second") {
      return (
        <VerifyTwo
          display={displayComponent}
          toggleModal={this.toggleModal}
          isOpen={isOpen}
          resendPIN={this.resendPIN}
          contact={contact}
          handleContact={this.handleContact}
          enteredPIN={enteredPIN}
          handlePIN={this.handlePIN}
        />
      );
    }
  }

  render() {
    return this.renderVerificationStep();
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapDispatchToProps, mapStateToProps)(VerificationView);
