import React from 'react';
import clsx from 'clsx';
import styles from './divider.module.scss';

interface IDividerProps {
  className?: string;
}

function Divider({ className }: IDividerProps) {
  return <div className={clsx(styles.divider, className)}></div>;
}

export default Divider;
