require('dotenv').config();

const os = require('os');
const isVPN = !!os.networkInterfaces().ppp0;

const COMMON = {
    isVPN,
    dbHOST: process.env.HOST_NAME || 'localhost',
    dbName: process.env.DB_NAME || 'hr',
};

module.exports = COMMON;
