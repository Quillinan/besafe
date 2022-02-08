import { model, Schema } from 'mongoose'

interface Produto {
  nome: String
  descricao: String
  preco: Number
  quantidade: Number
  user: Number
  createdAt: String
  updatedAt: String
}
const schema = new Schema<Produto>({
  nome: { type: String },
  descricao: { type: String },
  preco: { type: Number },
  quantidade: { type: Number },
  createdAt: { type: String },
  updatedAt: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

})

export const Produto = model<Produto>('Produto', schema)
