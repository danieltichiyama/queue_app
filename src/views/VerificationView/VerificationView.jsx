import React, { Component } from "react";
import VerifyOne from "../../components/VerifyOne";
import VerifyTwo from "../../components/VerifyTwo";

class VerificationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayComponent: "first",
      isOpen: false,
      contactMethod: "call",
    };
  }

  verifyStepTwo = () => {
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

  renderVerificationStep() {
    let { displayComponent, isOpen } = this.state;

    if (displayComponent === "first") {
      return (
        <VerifyOne
          display={displayComponent}
          toggleModal={this.toggleModal}
          isOpen={isOpen}
          verify={this.verifyStepTwo}
        />
      );
    } else if (displayComponent === "second") {
      return (
        <VerifyTwo
          display={displayComponent}
          toggleModal={this.toggleModal}
          isOpen={isOpen}
          verify={this.verifyStepTwo}
        />
      );
    }
  }

  render() {
    return this.renderVerificationStep();
  }
}

export default VerificationView;
