const Produto = require('../../models/Produto')

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
  }
}
