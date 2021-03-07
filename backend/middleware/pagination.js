const db = require('../db');
const paginationInfo = require('../config').paginationInfo;

// table == ime tablice u bazi podataka
function paginate(table) {
    return async (req, res, next) => {
        try {
            const page = parsePage(req.query.page);
            const limit = parseLimit(req.query.limit);

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const count = (await db.query(`SELECT COUNT(*) AS count FROM ${table}`, [])).rows[0].count;

            let results = {};

            if (endIndex < count) {
                results.next = {
                    page: page + 1,
                    limit: limit
                };
            }

            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                };
            }

            results.results = (await db.query(`SELECT * FROM ${table} OFFSET $1 LIMIT $2`, [startIndex, limit])).rows;

            res.paginatedResults = results;
            next();
        } catch (err) {
            res.status(500).json({
                error: true,
                message: err.details[0].message
            })
        }
    }
}

function parsePage(page) {
    let res = parseInt(page, 10);
    if (isNaN(res)) return paginationInfo.startPage;
    return res;
}

function parseLimit(limit) {
    let res = parseInt(limit, 10);
    if (isNaN(res)) return paginationInfo.startLimit;
    return res;
}

module.exports = paginate;