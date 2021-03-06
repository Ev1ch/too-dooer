import React, { MouseEvent } from 'react';
import clsx from 'clsx';
import Icon from '../icon';
import Icons from '../icon/icon-types';
import styles from './add-button.module.scss';

interface IButtonProps {
  className?: string;
  onClick?: (event?: MouseEvent<HTMLElement>) => void;
}

function AddButton({ className, onClick }: IButtonProps): JSX.Element {
  return (
    <button className={clsx(styles.addButton, className)} type="button" aria-label="+" onClick={onClick}>
      <Icon icon={Icons.PLUS} className={styles.addButtonIcon} width={20} height={20} />
    </button>
  );
}

export default AddButton;
