// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import BootstrapVue from 'bootstrap-vue'
import VueApollo from 'vue-apollo'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMoment from 'vue-moment'
// import { split } from 'apollo-link'
// import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from 'apollo-link-context'
// import { getMainDefinition } from 'apollo-utilities'

const ACCESS_TOKEN = localStorage.getItem('access_token')

const httpLink = new HttpLink({
  // URL to graphql server, you should use an absolute URL here
  uri: 'https://hasura-pradeep.herokuapp.com/v1alpha1/graphql',
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`
  }
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// Create the subscription websocket link
// const wsLink = new WebSocketLink({
//   uri: 'wss://hasura-pradeep.herokuapp.com/v1alpha1/graphql',
//   headers: {
//     'Authorization': `Bearer ${ACCESS_TOKEN}`
//   },
//   options: {
//     reconnect: true
//   }
// })

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query)
//     return kind === 'OperationDefinition' &&
//       operation === 'subscription'
//   },
//   wsLink,
//   authLink.concat(httpLink)
// )

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
  // connectToDevTools: true
})

// install the vue plugin
Vue.use(VueApollo)
Vue.use(BootstrapVue)
Vue.use(VueMoment)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
