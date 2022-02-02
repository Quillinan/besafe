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
    type User{
        id: ID!
        nome: String!
        sobrenome: String!
        email: String!
        dataDeNascimento: String!
        token: String!
        createdAt: String!
    }
        
    
    input RegisterInput {
        email: String!
        nome: String!
        sobrenome: String!
        dataDeNascimento: String!
        senha: String!
        confirmaSenha: String!
        
        
    }
    type Query{
        getProdutos: [Produto]
        getProduto(produtoId:ID!) : Produto
    }
    type Mutation{
        register(registerInput:RegisterInput): User!
        login(email: String!,senha:String!):User!
        createProduto(body:String!):Produto!
        deleteProduto(produtoId: ID!): String!
    }
`
