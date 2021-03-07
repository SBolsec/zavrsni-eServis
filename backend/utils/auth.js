const { sign } = require('jsonwebtoken');
const { config } = require('../config');

const createAccessToken = (user) => {
    return sign(
        { userId: user.userId },
        config.ACCESS_TOKEN_SECRET,
        { expiresIn: config.ACCESS_EXPIRATION_TIME }
    );
}

const createRefreshToken = (user) => {
    return sign(
        {
            userId: user.userId,
            tokenVersion: user.tokenVersion
        },
        config.REFRESH_TOKEN_SECRET,
        { expiresIn: config.REFRESH_EXPIRATION_TIME }
    )
}

module.exports = { createAccessToken, createRefreshToken }