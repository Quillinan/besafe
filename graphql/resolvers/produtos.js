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
    }
  }
}
