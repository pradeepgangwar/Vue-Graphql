<template>
  <div class="row">
    <div class="col-sm-10 offset-sm-1">
      <table class="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col"> Actions </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="todo in todos"
            :key="todo.id">
            <td>{{ todo.text }}</td>
            <td>{{ todo.created_at }}</td>
            <td>{{ todo.updated_at }}</td>
            <td>
              <b-button size="sm" variant="success">
                Mark as done
              </b-button>
              <b-button size="sm" variant="danger">
                Delete
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import { ALL_USER_TODOS, GET_USER_BY_ID } from '@/graphql'

export default {
  name: 'AllTodos',
  data () {
    return {
      todos: [],
      users: [],
      id: this.$route.params.id
    }
  },
  apollo: {
    users: {
      query: GET_USER_BY_ID,
      variables () {
        return {
          userid: this.id
        }
      }
    },
    todos: {
      query: ALL_USER_TODOS,
      variables () {
        return {
          userid: this.id
        }
      }
    }
  }
}

</script>
