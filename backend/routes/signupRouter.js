const express = require('express');
const router = express.Router();
const db = require('../db');
const { hash } = require('bcryptjs');
const joi = require('joi');

router.post('/user', async (req, res) => {
    // provjera unesenih podataka
    const schema = joi.object({
        firstName: joi.string().min(1).required(),
        lastName: joi.string().min(1).required(),
        email: joi.string().email().required(),
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

    // podatci ispravni
    const { firstName, lastName, email, password } = req.body;

    try {
        // provjera postoji li korisnik sa tim emailom
        const checkUser = await db.query(`SELECT * FROM korisnik WHERE email = $1`, [email]);
        if (checkUser.rows.length != 0) {
            return res.status(400).json({
                error: true,
                message: 'Već postoji račun s navedenom email adresom'
            });
        }

        // kriptiranje lozinke
        hash(password, 10, async (err, hashedPassword) => {
            // stvaranje korisnika u bazi
            const loginQuery = 'INSERT INTO korisnik (email, lozinka, sif_uloga) VALUES ($1, $2, $3) RETURNING sif_korisnik AS id';
            // 2 == obican korisnik
            let id = (await db.query(loginQuery, [email, hashedPassword, 2])).rows;

            if (id.length !== 1) {
                res.status(400).json({
                    error: true,
                    message: 'Greška kod baze'
                })
            }

            id = id[0].id;
            const userQuery = 'INSERT INTO osoba (ime, prezime, sif_korisnik) VALUES ($1, $2, $3)';
            await db.query(userQuery, [firstName, lastName, id]);
    
            return res.status(200).json({
                success: true,
                message: 'Korisnički račun uspješno stvoren'
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send();
    }
});

router.post('/service', async (req, res) => {
    // provjera unesenih podataka
    const schema = joi.object({
        companyName: joi.string().min(1).required(),
        oib: joi.string().pattern(new RegExp('[0-9]{11,11}')).required(),
        address: joi.string().min(1).required(),
        city: joi.number().required(),
        phone: joi.string().pattern(new RegExp('[0-9]{6,11}')).required(),
        email: joi.string().email().required(),
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

    // podatci ispravni
    const { companyName, oib, address, city, phone, email, password } = req.body;

    try {
        // provjera postoji li korisnik sa tim emailom
        const checkUser = await db.query(`SELECT * FROM korisnik WHERE email = $1`, [email]);
        if (checkUser.rows.length != 0) {
            return res.status(400).json({
                error: true,
                message: 'Već postoji račun s navedenom email adresom'
            });
        }

        // kriptiranje lozinke
        hash(password, 10, async (err, hashedPassword) => {
            // stvaranje korisnika u bazi
            const loginQuery = 'INSERT INTO korisnik (email, lozinka, sif_uloga) VALUES ($1, $2, $3) RETURNING sif_korisnik AS id';
            // 2 == serviser
            let id = (await db.query(loginQuery, [email, hashedPassword, 3])).rows;

            if (id.length !== 1) {
                res.status(400).json({
                    error: true,
                    message: 'Greška kod baze'
                })
            }

            id = id[0].id;
            const serviceQuery = 'INSERT INTO servis (naziv_servis, oib, telefon, adresa, sif_mjesto, sif_korisnik) VALUES ($1, $2, $3, $4, $5, $6)';
            await db.query(serviceQuery, [companyName, oib, phone, address, city, id]);
    
            return res.status(200).json({
                success: true,
                message: 'Račun uspješno stvoren'
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send();
    }
});

module.exports = router;