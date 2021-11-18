import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './input.module.scss';

interface IInputProps {
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
}

function Input({ className, onChange, placeholder, defaultValue, value }: IInputProps): JSX.Element {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <input
      type="text"
      value={value}
      className={clsx(styles.input, className)}
      onChange={onChangeHandler}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
}

export default Input;
