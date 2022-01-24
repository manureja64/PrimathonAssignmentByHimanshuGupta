const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const TestSchema = new Schema({
    title: { type: String, required: true },
    numOfOptions: { type: Number, enum: [4, 5], required: true },
    ///////////////////////////////////////
    duration: { type: Number, enum: [2, 5, 10, 15, 20, 30, 60] },
    type: { type: Number, enum: [0, 1] },
    subject: { type: Number, enum: [0, 1, 2, 3, 4, 5], required: true },
    class: { type: Number, enum: [0, 6, 7, 8, 9, 10, 11, 12], required: true },
    chapter: { type: Number, required: true },
    message: { type: String },
    notes: { type: String },
    //////////////////////////////////////////////
    direction: [{ type: Schema.Types.ObjectId, ref: 'Direction' }],
    question: [{ type: Schema.Types.ObjectId, ref: 'Question' }]

});

TestSchema
    .virtual('url')
    .get(function () {
        return '/catalog/test/' + this._id;
    });

//Export model
module.exports = mongoose.model('Test', TestSchema);
