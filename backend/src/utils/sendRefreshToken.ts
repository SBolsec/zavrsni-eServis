export const sendRefreshToken = (res: any, token: string) => {
  res.cookie("jid", token, {
    secure: process.env.NODE_ENV == 'production' ? true : false,
    httpOnly: true,
    path: "/token"
  });
}