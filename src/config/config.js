const JWT = {
    jwt: process.env.ACCESS_TOKEN_SECRET || '123456',
    jwtExp: '100d'
}
export {
    JWT
}