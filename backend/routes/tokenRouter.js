const express = require('express');
const router = express.Router();
const db = require('../db');
const { verify } = require('jsonwebtoken');
const { config } = require('../config');
const sendRefreshToken = require('../utils/sendRefreshToken');
const { createAccessToken, createRefreshToken } = require('../utils/auth');

router.post('/', async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
        return res.send({ ok: false, accessToken: "" });
    }

    let payload = null;
    try {
        payload = verify(token, config.REFRESH_TOKEN_SECRET);
    } catch (err) {
        console.log(err);
        return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and
    // we can send back an access token
    let user = null;
    try {
        user = (await db.query(`SELECT * FROM korisnik WHERE sif_korisnik = $1`, [payload.userId])).rows;
        if (user.length == 0) return res.send({ ok: false, accessToken: "" });

        user = user[0];
        if (user.verzija_tokena != payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }
    } catch (err) {
        console.log(err);
        return res.send({ ok: false, accessToken: "" });
    }

    const data = {
        userId: user.sif_korisnik,
        email: user.email,
        userType: user.naziv_uloga,
        isAdmin: user.sif_uloga == 1,
        tokenVersion: user.verzija_tokena
    };

    sendRefreshToken(res, createRefreshToken(data));

    return res.send({ ok: true, accessToken: createAccessToken(data) });
});

router.post('/revoke/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) return res.status(400).send();

    try {
        await db.query(`UPDATE korisnik SET verzija_tokena = verzija_tokena + 1 WHERE sif_korisnik = $1`, [id]);
    } catch (err) {
        console.log(err);
        return res.status(400).send();
    }

    return res.status(204).send();
});

module.exports = router;