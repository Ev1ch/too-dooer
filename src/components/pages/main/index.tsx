import React, { useState } from 'react';
import clsx from 'clsx';
import { INewTodoItem, ITodoItem } from 'types';
import { TodoList, AddButton, AddTodoModal, Divider } from 'components';
import { getMonthName } from 'helpers';
import styles from './main.module.scss';

interface IMainProps {
  currentDate: Date;
  notDoneItems: ITodoItem[];
  doneItems: ITodoItem[];
  onTodoStateChange?: (id: string) => Promise<boolean>;
  onTodoDelete?: (id: string) => void;
  onTodoEdit?: (id: string, updatedTodo: ITodoItem) => Promise<boolean>;
  onTodoAdd?: (todo: INewTodoItem) => Promise<boolean>;
}

function MainPage({
  currentDate,
  notDoneItems,
  doneItems,
  onTodoStateChange,
  onTodoDelete,
  onTodoEdit,
  onTodoAdd,
}: IMainProps): JSX.Element {
  const date = `${getMonthName(currentDate)} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  const [isFormActive, setIsFormActive] = useState(false);
  const [isAddFormLoader, setIsAddFormLoader] = useState(false);

  const onTodoAddHandler = async (todo: INewTodoItem) => {
    if (onTodoAdd) {
      setIsAddFormLoader(true);
      const isAdded = await onTodoAdd(todo);

      if (isAdded) {
        setIsFormActive(false);
      }

      setIsAddFormLoader(false);
    }
  };

  const onOpenFormHandler = () => {
    setIsFormActive(true);
  };

  const onCloseFormHandler = () => {
    setIsFormActive(false);
  };

  return (
    <div className={styles.main}>
      <AddTodoModal
        onSubmit={onTodoAddHandler}
        state={isFormActive}
        loaderState={isAddFormLoader}
        onClose={onCloseFormHandler}
      />
      <div className={clsx('container', styles.mainContainer)}>
        <header className={styles.mainHeader}>
          <h1 className={styles.mainTitle}>{date}</h1>
          <div className={styles.mainDescription}>
            <p>
              {notDoneItems.length} incomplete, {doneItems.length} completed.
            </p>
          </div>
          <Divider />
        </header>
        <main className={styles.mainSections}>
          <section className={styles.mainSection}>
            <h2 className={styles.mainSectionTitle}>Incomplete</h2>
            <TodoList
              onTodoStateChange={onTodoStateChange}
              onTodoDelete={onTodoDelete}
              onTodoEdit={onTodoEdit}
              items={notDoneItems}
            />
          </section>
          <section className={styles.mainSection}>
            <h2 className={styles.mainSectionTitle}>Completed</h2>
            <TodoList
              onTodoStateChange={onTodoStateChange}
              onTodoDelete={onTodoDelete}
              onTodoEdit={onTodoEdit}
              items={doneItems}
            />
          </section>
        </main>
        <footer className={styles.mainFooter}>
          <AddButton className={styles.mainAddButton} onClick={onOpenFormHandler} />
        </footer>
      </div>
    </div>
  );
}

export default MainPage;
