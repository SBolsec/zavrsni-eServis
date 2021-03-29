export const sendRefreshToken = (res: any, token: string) => {
  res.cookie("jid", token, {
    domain: process.env.NODE_ENV == 'production' ? 'eservis.herokuapp.com' : 'localhost',
    secure: process.env.NODE_ENV == 'production' ? true : false,
    httpOnly: true,
    path: "/token"
  });
}