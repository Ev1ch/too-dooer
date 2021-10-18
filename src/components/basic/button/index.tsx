import React, { ReactNode, MouseEvent } from 'react';
import styles from './button.module.scss';

interface IButtonProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Button({ children, onClick }: IButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
