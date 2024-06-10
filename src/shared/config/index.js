import "dotenv/config.js"

const config = {
    port : +process.env.APP_PORT || 6897,
    db: {
        host: process.env.DB_HOSTNAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: +process.env.DB_PORT,
        database: process.env.DB_NAME,
    },
    jwt: {
        secret: process.env.SECRET_KEY || "ok",
        refresh: process.env.REFRESH_KEY || "refresh",
    }
}

export default config;