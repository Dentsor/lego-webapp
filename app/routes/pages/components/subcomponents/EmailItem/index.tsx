//@flow
import React from 'react';
import styles from './EmailItem.css';
import { readmeIfy } from 'app/components/ReadmeLogo';

type Props = {
  email: string,
  logo?: any,
  recipient: string
};

const EmailItem = ({ email, logo, recipient }: Props) => {
  return (
    <div className={styles.container}>
      {logo && (
        <img className={styles.logo} src={logo} alt={recipient + ' logo'} />
      )}
      <div>
        <div className={styles.recipient}>{readmeIfy(recipient)}</div>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </div>
  );
};

export default EmailItem;
