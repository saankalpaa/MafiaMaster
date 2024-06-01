import React, { useEffect, useState } from "react";
import styles from "./lobby.module.css";

export const RoleRevealScreen = () => {
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          return prevTimer;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.roleRevealHeader}>Revealing your role in</h3>
      <div className={styles.timer}>{timer}</div>
    </div>
  );
};
