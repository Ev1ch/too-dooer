import React, { useState } from 'react';
import clsx from 'clsx';
import { Checkbox, Icon, Textarea, Input } from 'components';
import Icons from 'components/basic/icon/icon-types';
import { TodoStatuses } from 'common';
import { ITodoItem } from 'types';
import styles from './todo-item.module.scss';

interface ITodoItemProps {
  item: ITodoItem;
  onTodoStateChange?: (id: string) => void;
  onTodoDelete?: (id: string) => void;
  onTodoEdit?: (id: string, updatedTodo: ITodoItem) => Promise<boolean>;
}

function TodoItem({ item, onTodoStateChange, onTodoEdit, onTodoDelete }: ITodoItemProps): JSX.Element {
  const onStateChangeHandler = () => {
    if (onTodoStateChange) {
      onTodoStateChange(item.id);
    }
  };

  const [todo, setTodo] = useState({ ...item });
  const [isFocused, setIsFocused] = useState(false);

  const onFocusHandler = () => {
    setIsFocused(true);
  };
  const onEditHandler = async () => {
    if (onTodoEdit) {
      const isEdited = await onTodoEdit(todo.id, todo);

      if (isEdited) {
        setIsFocused(false);
      }
    } else {
      setIsFocused(false);
    }
  };

  const onDeleteHandler = () => {
    if (onTodoDelete) {
      onTodoDelete(todo.id);
    }
  };

  return (
    <div
      className={clsx(
        styles.todoItem,
        todo.status === TodoStatuses.DONE && styles.todoItemDone,
        isFocused && styles.todoItemFocused,
      )}
    >
      <Checkbox
        state={todo.status === TodoStatuses.DONE}
        onChange={onStateChangeHandler}
        className={styles.todoItemCheckbox}
      />
      <div className={styles.todoItemInformation}>
        <div className={styles.todoItemHeader}>
          {isFocused ? (
            <Input
              value={todo.title}
              className={clsx(styles.todoItemTitleEditor)}
              onChange={(event) => {
                setTodo((previousState) => ({ ...previousState, title: event.target.value }));
              }}
            />
          ) : (
            <p className={styles.todoItemTitle} onClick={onFocusHandler}>
              {todo.title}
            </p>
          )}
        </div>
        <div className={styles.todoItemDescription}>
          {isFocused ? (
            <Textarea
              className={clsx(styles.todoItemEditor, styles.todoItemDescriptionEditor)}
              value={todo.description}
              onChange={(event) => {
                setTodo((previousState) => ({ ...previousState, description: event.target.value }));
              }}
            />
          ) : (
            <p onClick={onFocusHandler}>{todo.description}</p>
          )}
        </div>
      </div>
      {isFocused ? (
        <button className={styles.todoItemButton} type="button" onClick={onEditHandler}>
          <Icon icon={Icons.TICK} width={20} height={20} />
        </button>
      ) : (
        <button className={styles.todoItemButton} type="button" onClick={onDeleteHandler}>
          <Icon icon={Icons.CROSS} width={20} height={20} />
        </button>
      )}
    </div>
  );
}

export default TodoItem;
