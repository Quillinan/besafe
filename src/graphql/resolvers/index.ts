import produtosResolvers from './produtos'
import usersResolvers from './users'

export default {
  Query: {
    ...produtosResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...produtosResolvers.Mutation
  }
}
