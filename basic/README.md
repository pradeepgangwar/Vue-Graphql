# Vue-Hasura-Graphql Basic

This repository contains the boilerplate for the basic application. This shows how to setup Vue application that uses [Hasura Graphql Engine](https://github.com/hasura/graphql-engine). This application is a to-do application which supports following features:

* Basic Login/Signup (No Third party application involved)
* Todo creation/deletion and marking a task as done.

## Requirements

* Vue version 2.5.2
* Node version >= 6.0.0

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Setting up apollo-client.

This application uses [vue-apollo](https://github.com/Akryum/vue-apollo) to connect to Hasura graphql API. Basic setup can be done as given below.

Open config/dev.env.js and config/prod.env.js and provide the necessary environment variabels. Use absolute urls for graphql endpoints.

* Import all the necessary libraries.
```
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
```

* Sets up the connection to graphql endpoint by fetching the absolute URL of the graphql endpoint from the environment varibales.
```
const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_ENDPOINT
})
```

* Sets up the websocket connection. This is required to setup the graphql subscriptions.
```
const wsLink = new WebSocketLink({
  uri: process.env.GRAPHQL_WS_ENDPOINT,
  options: {
    reconnect: true
  }
})
```

* Using the ability to split links, you can send data to each link depending on what kind of operation is being sent.
```
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' &&
      operation === 'subscription'
  },
  wsLink,
  httpLink
)
```
* Initiate the vue apollo client and use vue-apollo plugin.
```
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)
```

You are ready to use the application with Hasura using this basic setup.

## Project Structure

- **src/graphql.js**

  This file contains all the graphql queries subscriptions and mutations.

- **src/main.js**

  This file contains all the necessary imports and apollo client initializations.

- **App.vue**

  This file is the entry point of the vue application. You can import other comonents and use them here.

- **components/..**

  This folder contains various components of vue application.

## Additional notes:

* For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
* If you are behind proxy setup consider reading [this](https://www.jhipster.tech/configuring-a-corporate-proxy/) to setup your proxy support.
* To read more about Hasura Graphql Engine refer to their [docs](https://docs.hasura.io/) and the graphlql-engine [repo](https://github.com/hasura/graphql-engine).

##### Powered By:

![Hasura](../assets/hasura_mascot_logo_horizontal_200px.png)
