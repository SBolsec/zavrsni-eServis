export const config = {
  "ACCESS_TOKEN_SECRET": process.env.JWT_TOKEN!,
  "REFRESH_TOKEN_SECRET": process.env.JWT_REFRESH_TOKEN!,
  "ACCESS_EXPIRATION_TIME": '15s',
  "REFRESH_EXPIRATION_TIME": '7d'
}

export const paginationInfo = {
  startPage: 1,
  startLimit: 5
}