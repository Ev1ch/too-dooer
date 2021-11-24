import { gql } from '@apollo/client';

const GET_TODOS = gql`
  query GET_TODOS {
    todos {
      id
      title
      status
      description
      created_at
      updated_at
    }
  }
`;

const ADD_TODO = gql`
  mutation ADD_TODO($title: String, $description: String) {
    insert_todos_one(object: { title: $title, description: $description }) {
      id
      title
      status
      description
      created_at
      updated_at
    }
  }
`;

const DELETE_TODO = gql`
  mutation DELETE_TODO($id: uuid!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;

const EDIT_TODO = gql`
  mutation EDIT_TODO($id: uuid!, $title: String, $description: String, $status: Int) {
    update_todos_by_pk(pk_columns: { id: $id }, _set: { title: $title, description: $description, status: $status }) {
      id
      title
      status
      description
      created_at
      updated_at
    }
  }
`;

const SUBSCRIBE_TODOS = gql`
  subscription MySubscription {
    todos {
      updated_at
      title
      status
      id
      description
      created_at
    }
  }
`;

export { GET_TODOS, ADD_TODO, DELETE_TODO, EDIT_TODO, SUBSCRIBE_TODOS };
