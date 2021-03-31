export const sendRefreshToken = (res: any, token: string) => {
  res.cookie("jid", token, {
    domain: process.env.NODE_ENV == 'production' ? 'eservis.herokuapp.com' : 'localhost',
    secure: process.env.NODE_ENV == 'production' ? true : false,
    sameSite: 'None',
    httpOnly: true,
    path: "/token",
    maxAge: 604800000 // 7 days in milliseconds
  });
}