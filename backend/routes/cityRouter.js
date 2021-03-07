const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const query = `
        SELECT sif_mjesto AS id, 
            CONCAT(postanski_broj, ' ', naziv_mjesto) AS city
        FROM mjesto
        ORDER BY id`;

    try {
        const result = await db.query(query, []);
        return res.json(result.rows);
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: 'Greška na poslužitelju'
        })
    }
});



module.exports = router;