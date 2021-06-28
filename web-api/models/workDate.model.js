module.exports = (mongoose) => {

    const schema = mongoose.Schema(
        {
            userId: Number,
            name: String,
            date: String,
            department: String,
            workTimeStart: String,
            workTimeEnd: String,
            realWorkHour: Number,
            leaveHour: Number,
            leaveHour: Number,
            absentHour: Number,
            overtimeHour: Number,
            notes: String,
        },
        {
            timestamps: true, // createdAt, updatedAt
        },
    );

    return mongoose.model('workdates', schema);

};

/**
 * mongoose _id to id
 *      https://grokonez.com/node-js/mongoose-change-_id-to-id-in-returned-response-node-js-express-application-example
 */
