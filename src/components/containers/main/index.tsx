import React, { useState } from 'react';
import { MainPage } from 'components';
import { INewTodoItem, ITodoItem } from 'types';
import { TodoStatuses } from 'common';

function MainContainer(): JSX.Element {
  const [items, setItems] = useState<ITodoItem[]>([
    {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 1,
      title: 'Title 1',
      description: 'Description 1',
    },
    {
      id: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 2,
      title: 'Title 2',
      description: 'Description 2',
    },
    {
      id: '3',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 2,
      title: 'Title 3',
      description: 'Description 3',
    },
    {
      id: '4',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 1,
      title: 'Title 4',
      description: 'Description 4',
    },
  ]);

  const currentDate = new Date();

  const onTodoStateChange = (id: string) => {
    setItems((previousState) =>
      previousState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === TodoStatuses.DONE ? TodoStatuses.NOT_DONE : TodoStatuses.DONE,
          };
        }

        return item;
      }),
    );
  };
  const onTodoDelete = (id: string) => {
    setItems((previousState) => previousState.filter((item) => item.id !== id));
  };
  const onTodoEdit = (id: string, todo: Partial<ITodoItem>) => {
    setItems((previousState) => previousState.map((item) => (item.id === id ? { ...item, ...todo } : item)));
  };
  const onTodoAdd = (todo: INewTodoItem) => {
    if (todo.title.trim().length === 0) {
      return false;
    }

    const newTodo: ITodoItem = {
      ...todo,
      createdAt: new Date(),
      status: TodoStatuses.NOT_DONE,
      updatedAt: new Date(),
      id: Math.random().toString(),
    };
    setItems((previousState) => [...previousState, newTodo]);

    return true;
  };

  return (
    <MainPage
      currentDate={currentDate}
      onTodoStateChange={onTodoStateChange}
      onTodoDelete={onTodoDelete}
      onTodoEdit={onTodoEdit}
      onTodoAdd={onTodoAdd}
      doneItems={items.filter((item) => item.status === TodoStatuses.DONE)}
      notDoneItems={items.filter((item) => item.status === TodoStatuses.NOT_DONE)}
    />
  );
}

export default MainContainer;
