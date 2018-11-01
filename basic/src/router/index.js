import Vue from 'vue'
import Router from 'vue-router'
import AddUser from '../components/AddUser'
import AllTodos from '../components/AllTodos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AddUser',
      component: AddUser
    },
    {
      path: '/user/:id/todos',
      name: 'AllTodos',
      component: AllTodos,
      props: true
    }
  ]
})
