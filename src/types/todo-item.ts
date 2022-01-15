import { TodoStatuses } from 'common';

interface ITodoItem {
  id: string;
  status: TodoStatuses;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export default ITodoItem;
