import React from 'react';
import { ITodoItem } from 'types';
import TodoItem from './todo-item';
import styles from './todo-list.module.scss';

interface ITodoListProps {
  items: ITodoItem[];
  onTodoStateChange?: (id: string) => void;
  onTodoDelete?: (id: string) => void;
  onTodoEdit?: (id: string, updatedTodo: ITodoItem) => Promise<boolean>;
}

function TodoList({ items, onTodoStateChange, onTodoEdit, onTodoDelete }: ITodoListProps): JSX.Element {
  return (
    <div className={styles.todoList}>
      {items.map((item) => (
        <TodoItem
          item={item}
          onTodoStateChange={onTodoStateChange}
          onTodoEdit={onTodoEdit}
          onTodoDelete={onTodoDelete}
          key={item.id}
        />
      ))}
    </div>
  );
}

export default TodoList;
