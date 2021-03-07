const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    // Authorization: Bearer token
    let header = req.headers['authorization'];
    let token = header && header.split(' ')[1];

    // provjera postoji li token
    if (!token) {
        return res.status(400).send('Nije predan token');
    }
    
    try {
        await db.query(`DELETE FROM token WHERE token = $1`, [token]);
        res.status(204).send();
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;