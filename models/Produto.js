const { model, Schema } = require('mongoose')

const produtoSchema = new Schema({
  nome: String,
  descricao: String,
  preco: Number,
  quantidade: Number,
  createdAt: String,
  updatedAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }

})

module.exports = model('Produto', produtoSchema)
