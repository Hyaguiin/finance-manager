"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const BaseUrl_1 = require("../../utils/baseurl/BaseUrl");
require("dotenv/config");
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(BaseUrl_1.databaseURL, {
    dialect: 'postgres',
    logging: true,
});
const startServer = async () => {
    try {
        sequelize.authenticate()
            .then(() => {
            console.log(`Sucess! Database connected!!`);
        })
            .catch((err) => {
            if (err instanceof Error) {
                console.error(`Error: ${err}`);
            }
            else {
                console.error(`Unknown Error`);
            }
        });
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Error ${err}`);
        }
        else {
            console.error(`Unknown Error!!`);
        }
    }
};
exports.startServer = startServer;
exports.default = sequelize;
