import React from 'react';
import clsx from 'clsx';
import styles from './icon.module.scss';

interface IIconProps {
  icon: string;
  className?: string;
}

function Icon({ icon, className }: IIconProps): JSX.Element {
  return (
    <div className={clsx(styles.icon, className)}>
      <img src={icon} alt="" className={styles.iconImage} />
    </div>
  );
}

export default Icon;
