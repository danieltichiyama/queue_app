import React from "react";

const VerifyTwo = (props) => {
  return (
    <div>
      <h1>Explaination with email/phone number and method</h1>
      <button>Verify PIN</button>
      <button onClick={props.changeStep}>Resend PIN</button>
    </div>
  );
};

export default VerifyTwo;
