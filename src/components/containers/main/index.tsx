import React from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { ADD_TODO, DELETE_TODO, EDIT_TODO, SUBSCRIBE_TODOS } from 'services';
import { MainPage } from 'components';
import { INewTodoItem, ITodoItem } from 'types';
import { TodoStatuses } from 'common';

function MainContainer(): JSX.Element {
  const { data } = useSubscription<{ todos: ITodoItem[] }>(SUBSCRIBE_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [editTodo] = useMutation(EDIT_TODO);
  const [addTodo] = useMutation(ADD_TODO);

  const currentDate = new Date();

  const onTodoStateChange = async (id: string) => {
    const existingTodo = data?.todos.find((todo) => todo.id === id);

    if (existingTodo) {
      const updatedStatus = existingTodo.status === TodoStatuses.DONE ? TodoStatuses.NOT_DONE : TodoStatuses.DONE;
      await editTodo({ variables: { ...existingTodo, id, status: updatedStatus } });
    }
  };

  const onTodoDelete = async (id: string) => {
    const existingTodo = data?.todos.find((todo) => todo.id === id);

    if (existingTodo) {
      await deleteTodo({ variables: { id } });
    }
  };

  const onTodoEdit = async (id: string, todo: ITodoItem) => {
    if (todo.title.trim().length === 0) {
      return false;
    }

    const existingTodo = data?.todos.find((todo) => todo.id === id);

    if (existingTodo) {
      await editTodo({ variables: { ...todo } });
    }

    return true;
  };

  const onTodoAdd = async (todo: INewTodoItem) => {
    if (todo.title.trim().length === 0) {
      return false;
    }

    await addTodo({
      variables: {
        ...todo,
      },
    });

    return true;
  };

  return (
    <MainPage
      currentDate={currentDate}
      onTodoStateChange={onTodoStateChange}
      onTodoDelete={onTodoDelete}
      onTodoEdit={onTodoEdit}
      onTodoAdd={onTodoAdd}
      doneItems={data ? data.todos.filter((item) => item.status === TodoStatuses.DONE) : []}
      notDoneItems={data ? data.todos.filter((item) => item.status === TodoStatuses.NOT_DONE) : []}
    />
  );
}

export default MainContainer;
