import gql from 'graphql-tag'

// Define and export all the graphql mutations and queries here

export const TODOS_QUERY = gql`
  query todosQuery {
    todos {
      id
      text
      is_completed
      created_at
    }
  }
`
