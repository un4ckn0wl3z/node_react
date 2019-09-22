const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    hashed_password: { type: String, required: true },
    salt: String,
    created: { type: Date, default: Date.now },
    updated: Date,
    photo: { data: Buffer, contentType: String },
    about: { type: String, trim: true }
});

// virtual field
userSchema.virtual('password')
    .set(function (password) {
        // create tmp var called _password
        this._password = password;
        // generate a timestamp
        this.salt = uuidv1();
        // encrypt
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    })

// methods
userSchema.methods = {

    authenticate: function (plainPassword) {
        return this.encryptPassword(plainPassword) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            return "";
        }

    }
}

module.exports = mongoose.model("User", userSchema);