import nodemailer from 'nodemailer'
import dotenv from 'dotenv'


dotenv.config()

const config = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        password: process.env.APP_PASS
    }
}

const transportor = nodemailer.createTransport(config)

export default transportor
