import gql from 'graphql-tag'

export const ADD_USER = gql`
  mutation addUser($username: String!) {
    insert_users(
      objects:[{
        name: $username
      }]
    ) {
      returning {
        id
        name
      }
    }
  }
`
export const ALL_USER_TODOS = gql`
  query todosQuery($userid: Int!) {
    todos(
      where: { user_id: {_eq: $userid}, is_completed: { _eq: false }}
      order_by: id_desc
    ) {
      id
      text
      is_completed
      created_at
      updated_at
      is_public
      user_id
    }
  }
`
export const GET_USER_BY_ID = gql`
  query userQuery($userid: Int!) {
    users(
      where: { id: {_eq: $userid}}
    ) {
      id
      name
    }
  }
`
