import React, { useState } from 'react';
import clsx from 'clsx';
import Icon from '../icon';
import Icons from '../icon/icon-types';
import styles from './checkbox.module.scss';

interface ICheckboxProps {
  onChange?: (state: boolean) => void;
  state?: boolean;
}

function Checkbox({ onChange, state }: ICheckboxProps): JSX.Element {
  const [isChecked, setIsChecked] = useState(state === undefined ? false : state);

  const onClickHandler = () => {
    setIsChecked((previousState) => !previousState);

    if (onChange) {
      onChange(isChecked);
    }
  };

  return (
    <div className={clsx(styles.checkbox, isChecked && styles.checkboxChecked)} onClick={onClickHandler}>
      <Icon icon={Icons.TICK} className={styles.checkboxIcon} />
    </div>
  );
}

export default Checkbox;
