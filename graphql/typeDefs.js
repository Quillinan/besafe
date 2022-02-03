const { gql } = require('apollo-server')

module.exports = gql`
    type Produto{
        id: ID!
        nome: String!
        descricao: String!
        preco: Float!
        quantidade: Int!
        user:ID!
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
    input CreateProdutoInput {
        nome: String!
        descricao: String!
        preco: Float!
        quantidade: Int!
    }
    input UpdateProdutoInput {
        id : ID!
        nome: String
        descricao: String
        preco: Float
        quantidade: Int
    }
    type Query{
        getProdutos: [Produto]
        getProduto(produtoId:ID!) : Produto
    }
    type Mutation{
        register(registerInput:RegisterInput): User!
        login(email: String!,senha:String!):User!
        createProduto(createProdutoInput:CreateProdutoInput):Produto!
        updateProduto(updateProdutoInput:UpdateProdutoInput):Produto!
        deleteProduto(produtoId: ID!): String!
    }
`
