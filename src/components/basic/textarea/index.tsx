import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './textarea.module.scss';

interface ITextareaProps {
  className?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
}

function Textarea({ className, onChange, placeholder, defaultValue, value }: ITextareaProps): JSX.Element {
  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(event);
  };

  return (
    <textarea
      placeholder={placeholder}
      onChange={onChangeHandler}
      className={clsx(styles.textarea, className)}
      defaultValue={defaultValue}
      value={value}
    />
  );
}

export default Textarea;
