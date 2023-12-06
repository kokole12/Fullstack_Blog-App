import mongoose from 'mongoose'

export default async function connectDb (uri) {
  await mongoose.connect(uri)
    .then(() => {
      console.log('connected to database')
    })
    .catch(error => {
      console.log('connection failed')
      throw error
    })
}
