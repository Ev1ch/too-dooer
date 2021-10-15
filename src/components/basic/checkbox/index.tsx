import React, { useState } from 'react';
import clsx from 'clsx';
import Icon from '../icon';
import Icons from '../icon/icon-types';
import styles from './checkbox.module.scss';

interface ICheckboxProps {
  onChange?: (state: boolean) => void;
  state?: boolean;
}

function Checkbox({ onChange, state }: ICheckboxProps) {
  const [isChecked, setIsChecked] = useState(
    state === undefined ? false : state,
  );

  const [isFocused, setIsFocused] = useState(false);
  const onFocusHanlder = () => {
    setIsFocused(true);
  };
  const onBlurHanlder = () => {
    setIsFocused(false);
  };
  const onKeyPressHandler = () => {
    if (isFocused) {
      setIsChecked(true);
    }
  };

  const onClickHandler = () => {
    setIsChecked((previousState) => !previousState);

    if (onChange) {
      onChange(isChecked);
    }
  };

  return (
    <div
      className={clsx(styles.checkbox, isChecked && styles.checkboxChecked)}
      onClick={onClickHandler}
      onFocus={onFocusHanlder}
      onBlur={onBlurHanlder}
      onKeyPress={onKeyPressHandler}
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={-1}
    >
      <Icon icon={Icons.TICK} className={styles.checkboxIcon} />
    </div>
  );
}

export default Checkbox;
