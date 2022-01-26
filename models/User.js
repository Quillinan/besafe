const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  nome: String,
  sobrenome: String,
  email: String,
  senha: String,
  dataDeNascimento: String,
  createdAt: String,
  updatedAt: String

})

module.exports = model('User', userSchema)
