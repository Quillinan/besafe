import { model, Schema } from 'mongoose'

interface User {
  nome: String
  sobrenome: String
  email: String
  dataDeNascimento: String
  senha: String
  createdAt: String
  updatedAt: String
}
const schema = new Schema <User>({
  nome: { type: String },
  sobrenome: { type: String },
  email: { type: String },
  dataDeNascimento: { type: String },
  senha: { type: String },
  createdAt: { type: String },
  updatedAt: { type: String }
})

export const User = model<User>('User', schema)
