const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Conectado ao MongoDB')
    } catch (err) {
        console.log('Erro ao conectar ao MongoDB', err.message)
    }
}

module.exports = connectDB