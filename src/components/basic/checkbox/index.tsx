import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Icon from '../icon';
import Icons from '../icon/icon-types';
import styles from './checkbox.module.scss';

interface ICheckboxProps {
  onChange?: (state: boolean) => void;
  state?: boolean;
  className?: string;
}

function Checkbox({ onChange, state, className }: ICheckboxProps): JSX.Element {
  const [isChecked, setIsChecked] = useState(state ?? false);

  useEffect(() => {
    if (typeof state === 'boolean') {
      setIsChecked(state);
    }
  }, [state]);

  const onClickHandler = () => {
    setIsChecked((previousState) => !previousState);

    onChange && onChange(isChecked);
  };

  return (
    <div className={clsx(styles.checkbox, isChecked && styles.checkboxChecked, className)} onClick={onClickHandler}>
      <Icon icon={Icons.TICK} className={styles.checkboxIcon} height={10} width={10} />
    </div>
  );
}

export default Checkbox;
