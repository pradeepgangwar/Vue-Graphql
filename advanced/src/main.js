// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import BootstrapVue from 'bootstrap-vue'
import VueApollo from 'vue-apollo'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMoment from 'vue-moment'
import { ApolloLink, concat, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({
  // URL to graphql server, you should use an absolute URL here
  uri: 'http://localhost:8080/v1alpha1/graphql'
})

const token = localStorage.getItem('access_token') || null
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  return forward(operation)
})

// Create the subscription websocket link
let wsLink = new WebSocketLink({
  uri: 'ws://localhost:8080/v1alpha1/graphql',
  options: {
    reconnect: true
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

// Create the apollo client
const apolloClient = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

// install the vue plugin
Vue.use(VueApollo)
Vue.use(BootstrapVue)
Vue.use(VueMoment)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  },
  errorHandler (error) {
    console.log('Global error handler')
    console.error(error)
  }
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
