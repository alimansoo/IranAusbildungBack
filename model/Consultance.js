const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultanceSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 0
    },
});

module.exports = mongoose.model('Consultance', consultanceSchema);