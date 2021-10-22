module.exports = {
    accessSecret: process.env.ACCESS_TOKEN_SECRET_KEY || 'megumikato',
    refreshSecret: process.env.REFRESH_TOKEN_SECRET_KEY || 'yurucamp',
    jwtExp: '1d',
    jwtRefreshExp: '30d'
}
