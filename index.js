const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

const { MONGODB } = require('./config.js')
const Produto = require('./models/Produto')

const typeDefs = gql`
    type Produto{
        id: ID!
        nome: String!
        descricao: String!
        preco: Float!
        quantidade: Int!
        createdAt: String!
        updatedAt: String!
    }
    type Query{
        getProdutos: [Produto]
    }
`

const resolvers = {
  Query: {
    async getProdutos () {
      try {
        const produtos = await Produto.find()
        return produtos
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})
mongoose.connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB OK')
    return server.listen({ port: 5000 })
  }).then((res) => {
    console.log(`Server running at ${res.url}`)
  })
