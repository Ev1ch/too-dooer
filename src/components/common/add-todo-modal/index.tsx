import React, { MouseEvent, useEffect, useState, useMemo } from 'react';
import { Modal, Input, Textarea, Button, Loader } from 'components';
import { INewTodoItem } from 'types';
import styles from './add-todo-modal.module.scss';

interface IAddTodoModalProps {
  state?: boolean;
  loaderState?: boolean;
  onClose?: () => void;
  onSubmit: (todo: INewTodoItem) => void;
}

function AddTodoModal({ state, loaderState, onClose, onSubmit }: IAddTodoModalProps): JSX.Element {
  const initialTodo = useMemo<INewTodoItem>(() => ({ title: '', description: '' }), []);
  const [todo, setTodo] = useState<INewTodoItem>(initialTodo);

  const onSendHandler = (event: MouseEvent) => {
    event.preventDefault();
    onSubmit(todo);
  };

  useEffect(() => {
    if (!state) {
      setTodo(initialTodo);
    }
  }, [state, initialTodo]);

  return (
    <Modal onClose={onClose} title="Add todo" state={state}>
      <form className={styles.addTodoForm}>
        <Loader state={loaderState} className={styles.addTodoFormLoader} />
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
