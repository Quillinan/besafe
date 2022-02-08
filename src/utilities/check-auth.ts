import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config'
import { AuthenticationError } from 'apollo-server'

export default (context: any) => {
  const authHeader = context.req.headers.authorization
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1]
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY)
        return user
      } catch (err) {
        throw new AuthenticationError('token invalido/expirado')
      }
    }
    throw new Error('Token no formato errado')
  }
  throw new Error('Authorization Header nao encontrado')
}
