export const sendRefreshToken = (res: any, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/token"
  });
}