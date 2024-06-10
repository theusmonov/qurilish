import {Sequelize} from "sequelize";
import config from "./../shared/config/index.js";


const connectDb = new Sequelize(config.db.database, config.db.user, config.db.password, {
    dialect: "postgres",
    host: config.db.host,
    port: config.db.port,
    logging: false,
})



export default connectDb;