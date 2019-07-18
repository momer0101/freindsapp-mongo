var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    email: {type: String, lowercase: true},
    password: {type: String},
    name: {type: String},
    id: {type: String},
    token: {type: String},
    friends:[{type: mongoose.Schema.Types.ObjectId, ref: 'User', default:[]}]
});
userSchema.post('save',function(){
    console.log('in save',this);
    eventEmitter.emit('UserEvent',this);
});
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', userSchema);