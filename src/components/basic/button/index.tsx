import React, { ReactNode, MouseEvent } from 'react';
import styles from './button.module.scss';

interface IButtonProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

function Button({ children, onClick, disabled }: IButtonProps) {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
