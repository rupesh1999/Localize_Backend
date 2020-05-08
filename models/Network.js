const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const NetworkSchema = new Schema({
    data: {
        type: String,
        unique: true,
        required: true,
    },
});

const Network = mongoose.model('network', NetworkSchema, "Network");
export default Network;