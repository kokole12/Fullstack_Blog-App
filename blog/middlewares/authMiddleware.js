import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized access - Missing or invalid token' });
    }

    try {
        const tokenWithoutBearer = token.split(' ')[2];
        const decoded = jwt.verify(tokenWithoutBearer, process.env.SECRET);
        const {userId, username} = decoded
        req.user = {userId, username};
        console.log('Decoded Token:', req.user);

        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }
}
