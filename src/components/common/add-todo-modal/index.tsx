import React, { MouseEvent, useEffect, useState } from 'react';
import { Modal, Input, Textarea, Button } from 'components';
import { INewTodoItem } from 'types';
import styles from './add-todo-modal.module.scss';

interface IAddTodoModalProps {
  state?: boolean;
  onClose?: () => void;
  onSubmit: (todo: INewTodoItem) => void;
}

function AddTodoModal({ state, onClose, onSubmit }: IAddTodoModalProps) {
  const initialTodo: INewTodoItem = { title: '', description: '' };
  const [todo, setTodo] = useState<INewTodoItem>(initialTodo);

  const onSendHandler = (event: MouseEvent) => {
    event.preventDefault();
    onSubmit(todo);
  };

  useEffect(() => {
    if (!state) {
      setTodo(initialTodo);
    }
  }, [state]);

  return (
    <Modal onClose={onClose} title="Add todo" state={state}>
      <form className={styles.addTodoForm}>
        <div>
          <p className={styles.addTodoFormTitle}>Title</p>
          <Input
            className={styles.addTodoFormInput}
            value={todo.title}
            onChange={(event) => setTodo((previousState) => ({ ...previousState, title: event.target.value }))}
          />
        </div>
        <div>
          <p className={styles.addTodoFormTitle}>Description</p>
          <Textarea
            className={styles.addTodoFormTextarea}
            value={todo.description}
            onChange={(event) => setTodo((previousState) => ({ ...previousState, description: event.target.value }))}
          />
        </div>
        <Button onClick={onSendHandler} disabled={todo.title.trim().length === 0}>
          Add
        </Button>
      </form>
    </Modal>
  );
}

export default AddTodoModal;
