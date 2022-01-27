const { gql } = require('apollo-server')

module.exports = gql`
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
