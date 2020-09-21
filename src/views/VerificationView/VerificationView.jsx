import React, { Component } from "react";
import VerifyOne from "../../components/VerifyOne";
import VerifyTwo from "../../components/VerifyTwo";

class VerificationView extends Component {
  constructor(props) {
    super(props);
    this.state = { displayComponent: "first" };
  }

  changeComponent = () => {
    let { displayComponent } = this.state;
    this.setState({
      displayComponent: displayComponent === "first" ? "second" : "first",
    });
  };

  renderVerificationStep() {
    let { displayComponent } = this.state;

    if (displayComponent === "first") {
      return (
        <VerifyOne
          display={displayComponent}
          changeStep={this.changeComponent}
        />
      );
    } else if (displayComponent === "second") {
      return (
        <VerifyTwo
          display={displayComponent}
          changeStep={this.changeComponent}
        />
      );
    }
  }

  render() {
    return this.renderVerificationStep();
  }
}

export default VerificationView;
