const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    networkId: {
        type: String,
    }
});

userSchema.pre("save", function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (pw , callback) {
    bcrypt.compare(pw , this.password , function (err , isMatch){
        if (err) {
            console.log("is in comparing bcrypt password is " , err);
            return callback(err);
        }
        callback(null, isMatch);
    });
};

const User = mongoose.model('user', userSchema, "User");

module.exports = User;