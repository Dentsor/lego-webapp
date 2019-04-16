//@flow
import React from 'react';
import styles from './Statistic.css';

type Props = {
  statistic: string,
  label: string,
  topLabel?: string
};

const Statistic = ({ statistic, label, topLabel }: Props) => {
  return (
    <div className={styles.container}>
      {topLabel && <div className={styles.topLabel}>{topLabel}</div>}
      <div className={styles.statistic}>{statistic}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default Statistic;
