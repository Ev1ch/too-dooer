import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './input.module.scss';

interface IInputProps {
  className?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
}

function Input({ className, onChange, placeholder, defaultValue, value }: IInputProps) {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <input
      type="text"
      value={value}
      className={clsx(styles.input, className)}
      onChange={onChangeHandler}
      placeholder={placeholder}
    />
  );
}

export default Input;
