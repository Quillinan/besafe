const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')
const { SECRET_KEY } = require('../../config')
const User = require('../../models/User')
const { validateRegisterInput, validateLoginInput } = require('../../utilities/validators')
const checkAuth = require('../../utilities/check-auth')

function generateToken (user) {
  return jwt.sign({
    id: user.id,
    email: user.email
  }, SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
  Mutation: {
    async login (_, { email, senha }) {
      const { errors, valid } = validateLoginInput(email, senha)
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const user = await User.findOne({ email })

      if (!user) {
        errors.general = 'Email ou senha incorretos'
        throw new UserInputError('Email ou senha incorretos', { errors })
      }
      const match = await bcrypt.compare(senha, user.senha)
      if (!match) {
        errors.general = 'Email ou senha incorretos'
        throw new UserInputError('Email ou senha incorretos', { errors })
      }
      const token = generateToken(user)
      return {
        ...user._doc,
        id: user._id,
        token
      }
    },
    async register (_, { registerInput: { nome, sobrenome, email, dataDeNascimento, senha, confirmaSenha } }) {
      const { valid, errors } = validateRegisterInput(nome, sobrenome, email, dataDeNascimento, senha, confirmaSenha)
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }
      const user = await User.findOne({ email })
      if (user) {
        throw new UserInputError('email ja existe', {
          errors: {
            email: 'email ja existe'
          }
        })
      }

      senha = await bcrypt.hash(senha, 12)

      const newUser = new User({
        nome,
        sobrenome,
        email,
        dataDeNascimento,
        senha,
        createdAt: new Date().toISOString()
      })
      const res = await newUser.save()

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token
      }
    },
    async updateUser(_,{updateUserInput:{id,email,nome,sobrenome,dataDeNascimento}},context){
      const user = checkAuth(context)
      try{
        if (user.id === id) {
          const user = await User.findById(id)
          if(email){
            const existe = await User.findOne({ email })
            if (existe){
              throw new UserInputError('email ja existe', {
                errors: {
                  email: 'email ja existe'
                }
              })
            }else{
              user.email = email
            }
          }
          if (nome) {
            user.nome = nome
          }
          if (sobrenome) {
            user.sobrenome = sobrenome
          }
          if (dataDeNascimento) {
            user.dataDeNascimento = dataDeNascimento
          }
          user.save()
          return user
        }
      }catch (err) {
        throw new Error(err)
      }
    }
  }
}
