const Produto = require('../../models/Produto')
const checkAuth = require('../../utilities/check-auth')
const { AuthenticationError } = require('apollo-server')

module.exports = {
  Query: {
    async getProdutos () {
      try {
        const produtos = await Produto.find()
        return produtos
      } catch (err) {
        throw new Error(err)
      }
    },
    async getProduto (_, { produtoId }) {
      try {
        const produto = await Produto.findById(produtoId)
        if (produto) {
          return produto
        } else {
          throw new Error('Produto nao encontrado')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async createProduto (_, { produtoInput: { nome, descricao, preco, quantidade } }, context) {
      const user = checkAuth(context)

      const newProduto = new Produto({
        user: user.id,
        nome,
        descricao,
        preco,
        quantidade,
        createdAt: new Date().toISOString()
      })
      const produto = await newProduto.save()
      return produto
    },
    async deleteProduto (_, { produtoId }, context) {
      const user = checkAuth(context)
      console.log(user.id)
      try {
        const produto = await Produto.findById(produtoId)
        console.log(produto.user)
        console.log(produto.id)
        if (user.id === produto.user) {
          await produto.delete()
          return 'Produto deletado'
        } else {
          throw new AuthenticationError('Acao proibida')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}
