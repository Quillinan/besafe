const Produto = require('../../models/Produto')
const checkAuth = require('../../utilities/check-auth')
const { AuthenticationError } = require('apollo-server')

module.exports = {
  Query: {
    async getProdutos (_, args, context) {
      const user = checkAuth(context)
      try {
        const produtos = await Produto.find({ user: user.id })
        if (produtos.length === 0) {
          throw new Error('Nenhum produto encontrado')
        } else {
          return produtos
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    async getProduto (_, { produtoId }, context) {
      const user = checkAuth(context)
      try {
        const produto = await Produto.findById(produtoId)
        if (produto && user.id === produto.user.toString()) {
          return produto
        } else {
          throw new Error('Produto nao encontrado ou sem permissao')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async createProduto (_, { createProdutoInput: { nome, descricao, preco, quantidade } }, context) {
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
    async updateProduto (_, { updateProdutoInput: { id, nome, descricao, preco, quantidade } }, context) {
      const user = checkAuth(context)
      try {
        const produto = await Produto.findById(id)
        if (user.id === produto.user.toString()) {
          if (nome) {
            produto.nome = nome
          }
          if (descricao) {
            produto.descricao = descricao
          }
          if (preco) {
            produto.preco = preco
          }
          if (quantidade) {
            produto.quantidade = quantidade
          }
          produto.save()
          return produto
        } else {
          throw new AuthenticationError('Acao proibida')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    async deleteProduto (_, { produtoId }, context) {
      const user = checkAuth(context)
      try {
        const produto = await Produto.findById(produtoId)
        if (user.id === produto.user.toString()) {
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
