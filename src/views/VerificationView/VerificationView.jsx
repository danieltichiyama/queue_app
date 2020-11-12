import React, { Component } from "react";
import { connect } from "react-redux";
import VerifyOne from "../../components/VerifyOne";
import VerifyTwo from "../../components/VerifyTwo";
import { actionVerificationType, actionVerifyPIN } from "../../actions";

class VerificationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayComponent: "first",
      isOpen: false,
      verificationType: "call",
      contact: "",
      enteredPIN: null || "",
      retailerId: "111111111111111111111111",
    };
    this.handlePIN = this.handlePIN.bind(this);
    this.handleContact = this.handleContact.bind(this);
    this.sendPIN = this.sendPIN.bind(this);
  }

  componentDidMount() {
    this.setState({retailerId : JSON.parse(window.localStorage.getItem('retailer')).id})
  }

  sendPIN = (e) => {
    e.preventDefault();
    let {
      displayComponent,
      verificationType,
      contact,
      retailerId
    } = this.state;
    let data = {
      verificationType,
      contact,
      retailerId
    };
    this.setState({
      displayComponent: displayComponent === "first" ? "second" : "first",
    });
    this.props.dispatchSendPIN(data);
  };

  verifyPIN = (e) => {
    e.preventDefault();
    let { enteredPIN,retailerId } = this.state;
    let data = {
      enteredPIN,
      retailerId
    };
    this.setState({
      isOpen: !this.state.isOpen,
    });
    this.props.dispatchVerifyPIN(data);
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

  handleContact = (value, country, e, formattedValue) => {
    let { contact } = this.state;
    this.setState({ contact });
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
          handleContact={this.handleContact}
          enteredPIN={enteredPIN}
          handlePIN={this.handlePIN}
          verifyPIN={this.verifyPIN}
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
  return {
    dispatchSendPIN: (data) => {
      dispatch(actionVerificationType(data));
    },
    dispatchVerifyPIN: (data) => {
      dispatch(actionVerifyPIN(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerificationView);
