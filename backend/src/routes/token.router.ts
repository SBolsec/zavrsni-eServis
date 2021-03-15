import express from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '../config/constants';
import { sendRefreshToken } from '../utils/sendRefreshToken';
import { createAccessToken, createRefreshToken } from '../utils/auth';
import UserController from '../controllers/user.controller';
import { User } from '../models';

const router = express.Router();

router.post('/', async (req, res) => {
  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload: any = null;
  try {
    payload = verify(token, config.REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  // token je validan
  // mozemo poslati access token
  let user: User|null = null;
  try {
    const userController = new UserController();
    user = await userController.getUserById(payload.userId);

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion != payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user!));

  return res.send({ ok: true, accessToken: createAccessToken(user!) });
});

router.post('/revoke/:id', async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send();

  try {
    // await db.query(`UPDATE korisnik SET verzija_tokena = verzija_tokena + 1 WHERE sif_korisnik = $1`, [id]);
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }

  return res.status(204).send();
});

export default router;