const produtosResolvers = require('./produtos')
const usersResolvers = require('./users')

module.exports = {
  Query: {
    ...produtosResolvers.Query
  }
}
