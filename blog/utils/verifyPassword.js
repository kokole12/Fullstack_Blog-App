import bcrypt from 'bcryptjs'

export default async function verifyPassword(password, db_password) {
    return bcrypt.compare(password, db_password)
}
