import React from 'react';
import styles from './error.module.scss';

interface IErrorModalProps {
  error: string;
}

function ErrorPage({ error }: IErrorModalProps): JSX.Element {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>{error}</h1>
      </div>
    </div>
  );
}

export default ErrorPage;
