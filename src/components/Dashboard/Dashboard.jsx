import React, { useState } from "react";
import styles from "./Dashboard.module.scss";

const Dashboard = (props) => {
  const [count, setCount] = useState(22);

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    setCount(count - 1);
  };

  return (
    <div className={styles.Dashboard}>
      <div className={styles.counter}>
        <div className={styles.counterButton} onClick={handleMinus}>
          -
        </div>
        <div className={styles.count}>
          <h3>{count}</h3>
          <p>in store</p>
        </div>
        <div className={styles.counterButton} onClick={handlePlus}>
          +
        </div>
      </div>
      <button className={styles.addToQueue}>ADD TO QUEUE</button>
    </div>
  );
};

export default Dashboard;
