<template>
  <div class="row">
    <div class="col-sm-4 offset-sm-4 text-center">
      <b-form @submit="adduser">

        <b-form-group id="username"
                      label="Your Username:"
                      label-for="usernameinput">
          <br>
          <b-form-input id="usernameinput"
                        type="text"
                        v-model="username"
                        required
                        placeholder="Enter username">
          </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { ADD_USER } from '@/graphql'

export default {
  name: 'AddUser',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    adduser () {
      this.$apollo
        .mutate({
          mutation: ADD_USER,
          variables: {
            username: this.username
          }
        })
        .then(response => {
          var userid = response.data.insert_users.returning[0].id
          this.$router.replace(`/user/${userid}/todos`)
        })
    }
  }
}
</script>
