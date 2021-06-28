const db = require('../models');
const WorkDate = db.workDate;

let promiseArr = [];

// crawler 回傳格式直接回傳結果
const resCallbackCypress = () => ({
    result: 1,
    message: '',
});

// crawler: 匯入全部資料
const exportAllData = async () => {

    // 取得資料長度
    const length = await WorkDate.find()
        .then((data) => data.length);

    // 若資料有長度則先砍掉整個 collection 後再一次匯入，避免資料重複寫入
    // if (length > 0) db.mongoose.connection.db.dropCollection('workdates');
    // WorkDate.create(data);

};

// 更新欄位 promise
const handleUpdateData = async (obj) => await WorkDate.findOneAndUpdate(
    {
        name: obj.name,
        date: obj.date,
    },
    { ...obj },
    { new: true },
);

// 處理迴圈程序
const handlePromiseLoop = async (body) => {

    await body.forEach((obj) => {

        WorkDate.find({
            name: obj.name,
            date: obj.date,
        })
        .then((res) => {

            // 查找結果
            if (res.length) promiseArr.push(handleUpdateData(obj));
            else WorkDate.create(obj);

        });

    });

};

// crawler: 新增
const createData = async ({ body }, res) => {

    // 取得資料長度
    const data = await WorkDate.find();

    if (data.length) {

        await handlePromiseLoop(body);

        await Promise.all(promiseArr)
            .then(() => res.send(resCallbackCypress()))
            .catch((err) => console.log('err:', err));

    }
    else {

        // 若一開始沒有 db / collection 則先寫入資料
        await WorkDate.create(body);
        await res.send(resCallbackCypress());

    }

};

module.exports = {
    exportAllData,
    createData,
};

/**
 * [mongoose]
 *      https://github.com/bezkoder/node-express-mongodb/blob/master/app/controllers/tutorial.controller.js
 */
