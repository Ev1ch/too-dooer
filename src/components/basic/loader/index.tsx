import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Spinner } from 'components';
import styles from './loader.module.scss';

interface ILoaderProps {
  className?: string;
  state?: boolean;
}

function Loader({ className, state }: ILoaderProps): JSX.Element {
  const [isActive, setIsActive] = useState(state ?? true);

  useEffect(() => {
    setIsActive(state || false);
  }, [state]);

  return (
    <div className={clsx(styles.loader, isActive && styles.loaderActive, className)}>
      <Spinner className={styles.loaderSpinner} />
    </div>
  );
}

export default Loader;
