import React, { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { Icon } from 'components';
import Icons from 'components/basic/icon/icon-types';
import styles from './modal.module.scss';
import clsx from 'clsx';

interface IModalProps {
  children?: ReactNode;
  state?: boolean;
  title?: string;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Modal({ children, state, title, onClose }: IModalProps) {
  const [isActive, setIsActive] = useState(state === undefined ? true : state);

  const onCloseHandler = (event: MouseEvent<HTMLButtonElement>) => {
    setIsActive(false);

    if (onClose) {
      onClose(event);
    }
  };

  useEffect(() => {
    setIsActive(state || false);
  }, [state]);

  return (
    <div className={clsx(styles.modalContainer, isActive && styles.modalActive)}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>{title}</span>
          <button className={styles.modalClose} onClick={onCloseHandler}>
            <Icon icon={Icons.CROSS} />
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
