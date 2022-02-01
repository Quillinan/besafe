const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')
const { SECRET_KEY } = require('../../config')
const User = require('../../models/User')

module.exports = {
  Mutation: {
    async register (_, { registerInput: { email, nome, sobrenome, dataDeNascimento, senha, confirmaSenha } }) {
      senha = await bcrypt.hash(senha, 12)
      const user = await User.findOne({ email })
      if (user) {
        throw new UserInputError('email ja existe', {
          errors: {
            email: 'email ja existe'
          }
        })
      }

      const newUser = new User({
        nome,
        sobrenome,
        email,
        dataDeNascimento,
        senha,
        createdAt: new Date().toISOString()
      })
      const res = await newUser.save()

      const token = jwt.sign({
        id: res.id,
        email: res.email
      }, SECRET_KEY, { expiresIn: '1h' })

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}
