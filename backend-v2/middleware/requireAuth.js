const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../utils/config');

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const {_id} = jwt.verify(token, config.SECRET);
        const user = await User.findById(_id).select('_id');
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = requireAuth;   