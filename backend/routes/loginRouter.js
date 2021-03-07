const express = require('express');
const router = express.Router();
const db = require('../db');
const { compare } = require('bcrypt');
const joi = require('joi');
const sendRefreshToken = require('../utils/sendRefreshToken');
const { createAccessToken, createRefreshToken } = require('../utils/auth');

router.post('/', async (req, res) => {
    // provjera unesenih podataka
    const schema = joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });

    try {
        await schema.validateAsync(req.body);
    }
    catch (err) {
        return res.status(400).json({
            error: true,
            message: err.details[0].message
        });
    }

    const { email, password } = req.body;

    try {
        // provjera postoji li korisnik s tim emailom
        let korisnik = (await db.query(`SELECT * FROM korisnik NATURAL JOIN uloga WHERE email = $1`, [email])).rows;

        // korisnik ne postoji
        if (korisnik.length === 0) {
            return res.status(400).json({
                error: true,
                message: "Pogrešan email ili lozinka"
            });
        }

        // korisnik postoji
        korisnik = korisnik[0];

        // provjera lozinke
        const match = await compare(password, korisnik.lozinka);

        if (!match) {
            return res.status(400).json({
                error: true,
                message: "Pogrešan email ili lozinka"
            });
        }

        const user = {
            userId: korisnik.sif_korisnik,
            email: korisnik.email,
            userType: korisnik.naziv_uloga,
            isAdmin: korisnik.sif_uloga == 1,
            tokenVersion: korisnik.verzija_tokena
        };

        sendRefreshToken(res, createRefreshToken(user));

        return res.status(200).json({
            accessToken: createAccessToken(user),
            user
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: true,
            message : "Greška na poslužitelju. Pokušajte ponovno kasnije i javite se administratoru."
        });
    }
});

module.exports = router;