const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/isAuth');
const paginate = require('../middleware/pagination');

router.get('/', async (req, res) => {
    res.redirect(process.env.FRONTEND_URL);
});

router.get('/test', paginate('test'), async (req, res) => {
    res.json(res.paginatedResults);
});

module.exports = router;