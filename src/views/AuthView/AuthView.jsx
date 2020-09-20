import React, { useState, useEffect } from 'react';
import Login from "../../components/Login";
import Register from "../../components/Register";
import styles from "./AuthView.module.scss";

function AuthView(props) {
  const [isLogin, setIsLogin] = useState(true);

  // useEffect(() => {
  //   props.setRetailerLoggedIn(isLogin);
  // }, [isLogin, props])

  return (
    <div className={styles.AuthView}>
      {isLogin ?
        <Login setIsLogin={setIsLogin} /> :
        <Register setIsLogin={setIsLogin} />
      }
    </div>
  );
}

export default AuthView;
