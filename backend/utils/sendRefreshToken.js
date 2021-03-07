const sendRefreshToken = (res, token) => {
    res.cookie("jid", token, {
        httpOnly: true,
        path: "/token"
    });
}

module.exports = sendRefreshToken;