import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'

import { MONGODB } from './config'
import resolvers from './src/graphql/resolvers'
import typeDefs from './src/graphql/typeDefs'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
})
mongoose.connect(MONGODB)
  .then(async () => {
    console.log('MongoDB OK')
    return await server.listen({ port: 5000 })
  }).then((res) => {
    console.log(`Server running at ${res.url}`)
  })
