import React from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { ADD_TODO, DELETE_TODO, EDIT_TODO, SUBSCRIBE_TODOS } from 'services';
import { MainPage } from 'components';
import { INewTodoItem, ITodoItem } from 'types';
import { TodoStatuses, ApolloErrors, Routes } from 'common';

function MainContainer(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  location.state = { fromRouter: true };
  const { data } = useSubscription<{ todos: ITodoItem[] }>(SUBSCRIBE_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [editTodo] = useMutation(EDIT_TODO);
  const [addTodo] = useMutation(ADD_TODO);

  const currentDate = new Date();

  const onTodoStateChange = async (id: string) => {
    const existingTodo = data?.todos.find((todo) => todo.id === id);
    let isUpdated = true;

    if (existingTodo) {
      const updatedStatus = existingTodo.status === TodoStatuses.DONE ? TodoStatuses.NOT_DONE : TodoStatuses.DONE;
      await editTodo({ variables: { ...existingTodo, id, status: updatedStatus } }).catch((error) => {
        isUpdated = false;

        if (error.message === ApolloErrors.FETCH_FAIL) {
          navigate(Routes.OFFLINE, { state: { fromRouter: true } });
        }
      });
    }

    return isUpdated;
  };

  const onTodoDelete = async (id: string) => {
    const existingTodo = data?.todos.find((todo) => todo.id === id);
    let isDeleted = true;

    if (existingTodo) {
      await deleteTodo({ variables: { id } }).catch((error) => {
        isDeleted = false;

        if (error.message === ApolloErrors.FETCH_FAIL) {
          navigate(Routes.OFFLINE, { state: { fromRouter: true } });
        }
      });
    }

    return isDeleted;
  };

  const onTodoEdit = async (id: string, todo: ITodoItem) => {
    if (todo.title.trim().length === 0) {
      return false;
    }
    let isEdited = true;

    const existingTodo = data?.todos.find((todo) => todo.id === id);

    if (existingTodo) {
      await editTodo({ variables: { ...todo } }).catch((error) => {
        isEdited = false;

        if (error.message === ApolloErrors.FETCH_FAIL) {
          navigate(Routes.OFFLINE, { state: { fromRouter: true } });
        }
      });
    }

    return isEdited;
  };

  const onTodoAdd = async (todo: INewTodoItem) => {
    if (todo.title.trim().length === 0) {
      return false;
    }
    let isAdded = true;

    await addTodo({
      variables: {
        ...todo,
      },
    }).catch((error) => {
      isAdded = false;

      if (error.message === ApolloErrors.FETCH_FAIL) {
        navigate(Routes.OFFLINE, { state: { fromRouter: true } });
      }
    });

    return isAdded;
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
