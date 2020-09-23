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
      contactMethod: "call",
      contact: "",
    };
    this.handleContact = this.handleContact.bind(this);
    this.sendPIN = this.sendPIN.bind(this);
  }

  sendPIN = (e) => {
    let { displayComponent } = this.state;
    this.setState({
      displayComponent: displayComponent === "first" ? "second" : "first",
    });
    console.log(this.state.contact);
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

  renderVerificationStep() {
    let { displayComponent, isOpen, contact, sendPIN } = this.state;

    if (displayComponent === "first") {
      return (
        <VerifyOne
          display={displayComponent}
          toggleModal={this.toggleModal}
          isOpen={isOpen}
          verify={this.sendPIN}
          contact={this.contact}
          handleContact={this.handleContact}
          sendPIN={this.sendPIN}
        />
      );
    } else if (displayComponent === "second") {
      return (
        <VerifyTwo
          display={displayComponent}
          toggleModal={this.toggleModal}
          isOpen={isOpen}
          verify={this.sendPIN}
          contact={this.contact}
          handleContact={this.handleContact}
          sendPIN={this.sendPIN}
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
