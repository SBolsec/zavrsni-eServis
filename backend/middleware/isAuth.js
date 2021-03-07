const db = require('../db');
const jwt = require('jsonwebtoken');
const { config } = require('../config');

const isAuth = roles => async (req, res, next) => {
    const authorization = req.headers['authorization'];

    if (!authorization) {
        return res.status(403).send("not authenticated");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

        // autorizacija korisnika
        const role = (await db.query(`SELECT sif_uloga FROM korisnik WHERE sif_korisnik = $1`, [payload.userId])).rows;
        if (role.length == 0) return res.sendStatus(403);
        // ima li korisnik potrebnu ulogu
        if (!roles.includes(role[0].sif_uloga)) {
            return res.status(403).send("Nemate ovlasti");
        }

        res.payload = payload;
    } catch (err) {
        console.log(err);
        return res.status(403).send("not authenticated");
    }

    return next();
};

module.exports = isAuth;

// function authentificatior(roles) {
//     return async function checkValid(req, res, next) {
//         // Authorization: Bearer token
//         let header = req.headers['authorization'];
//         let token = header && header.split(' ')[1];

//         // provjera postoji li token
//         if (!token) {
//             return res.status(401).send('Nije predan token');
//         }

//         try {
//             // provjera tokena
//             jwt.verify(token, config.ACCESS_TOKEN_SECRET, async (err, user) => {
//                 // token neispravan
//                 if (err) return res.sendStatus(403);
                
//                 // provjera postoji li token u bazi
//                 const korisnik = (await db.query(`SELECT * FROM token WHERE token = $1`, [token])).rows;
//                 if (korisnik.length == 0) return res.status(403).send('Token ne postoji u sustavu');
//                 // je li token vezan uz ispravnog korisnika
//                 if (korisnik[0].sif_korisnik != user.userId) return res.status(403).send('Neispravan korisnik za token');

//                 // autorizacija korisnika
//                 const role = (await db.query(`SELECT sif_uloga FROM korisnik WHERE sif_korisnik = $1`, [user.userId])).rows;
//                 if (role.length == 0) return res.sendStatus(403);
//                 // ima li korisnik potrebnu ulogu
//                 if (!roles.includes(role[0].sif_uloga)) {
//                     return res.status(403).send("Nemate ovlasti");
//                 }

//                 // uspjesna autetifikacija i autorizacija
//                 req.user = user;
//                 next();
//             });
//         } catch (err) {
//             console.log(error);
//             return res.status(400).send("Greska u bazi podataka");
//         }
//     }
// }

// module.exports = authentificatior;