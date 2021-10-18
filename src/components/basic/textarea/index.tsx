import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './textarea.module.scss';

interface ITextareaProps {
  className?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
}

function Textarea({ className, onChange, placeholder, defaultValue, value }: ITextareaProps) {
  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <textarea
      placeholder={placeholder}
      onChange={onChangeHandler}
      className={clsx(styles.textarea, className)}
      defaultValue={defaultValue}
      value={value}
    ></textarea>
  );
}

export default Textarea;
