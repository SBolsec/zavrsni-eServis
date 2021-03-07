const config = {
    "ACCESS_TOKEN_SECRET": process.env.DUMMY_JWT_TOKEN,
    "REFRESH_TOKEN_SECRET": process.env.DUMMY_JWT_REFRESH_TOKEN,
    "ACCESS_EXPIRATION_TIME": '15s',
    "REFRESH_EXPIRATION_TIME": '7d'
}

const paginationInfo = {
    startPage: 1,
    startLimit: 5
}

module.exports = {config, paginationInfo}