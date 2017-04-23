const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// each user will be initialized with an empty array for favorites. 
const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    favorites: [{
        title: String,
        poster: String
    }]
});

// virtual properties
userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Static methods on scehema
userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
}

// Instance methods
userSchema.methods.apiRepr = function() {
    return {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        fullName: this.fullName,
        favorites: this.favorites
    };
}

userSchema.methods.validatePassword = function(inputPw) {
    return bcrypt.compare(inputPw, this.password);
}

const User = mongoose.model('users', userSchema);

module.exports = { User };