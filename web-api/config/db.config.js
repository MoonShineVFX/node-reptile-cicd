const COMMON = require('./index');

module.exports = {
    url: `mongodb://${COMMON.dbHOST}/${COMMON.dbName}`,
};
