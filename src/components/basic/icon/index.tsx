import React, { MouseEvent } from 'react';
import clsx from 'clsx';
import styles from './icon.module.scss';

interface IIconProps {
  icon: string;
  className?: string;
  width?: number;
  height?: number;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

function Icon({ icon, className, height, width, onClick }: IIconProps): JSX.Element {
  return (
    <div className={clsx(styles.icon, className)} onClick={onClick}>
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
