const {Pool} = require('pg');
const {dbConstants} = require('./dbConstants');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
    query: (text, params) => {
        return pool.query(text, params)
            .then(res => {
                return res;
            });
    },
    pool: pool
}