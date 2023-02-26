import styles from "./SpeechTable.module.css";

import React from "react";

interface IProps {
  isOdd: boolean;
  text: string;
};

function ParentheticalRow(props:IProps) {
  const { isOdd, text } = props;
  const rowStyle = `${styles.parentheticalRow} ${isOdd ? styles.oddRow : styles.evenRow}`;
  return (
    <div className={rowStyle}>
      <span className={styles.selectColumn} />
      <span className={styles.dialogueColumn}>{text}</span>
      <span className={styles.recordedTakesColumn} />
      <span className={styles.finalColumn} />
    </div>
  );
}

export default ParentheticalRow;