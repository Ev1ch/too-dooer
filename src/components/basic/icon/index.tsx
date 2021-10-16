import React from 'react';
import clsx from 'clsx';
import styles from './icon.module.scss';

interface IIconProps {
  icon: string;
  className?: string;
  width?: number;
  height?: number;
}

function Icon({ icon, className, height, width }: IIconProps): JSX.Element {
  return (
    <div className={clsx(styles.icon, className)}>
      <img
        src={icon}
        alt=""
        className={styles.iconImage}
        style={{
          height,
          width,
        }}
      />
    </div>
  );
}

export default Icon;
