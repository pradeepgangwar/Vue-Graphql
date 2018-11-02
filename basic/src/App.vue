<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <span class="navbar-brand center-align">ToDo Application</span>
    </nav>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>

import AddUser from './components/AddUser'
import PendingTodos from './components/PendingTodos'

export default {
  name: 'app',
  components: {
    AddUser,
    PendingTodos
  }
}
</script>
