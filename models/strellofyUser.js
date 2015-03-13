// Mongo Model for a user.
// Keeps track of people's login information.
// TODO In the future, users can have their own profiles with customized information.

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

var StrellofyUserSchema = mongoose.Schema({}, { strict: false });
StrellofyUserSchema.plugin(findOrCreate);

module.exports = mongoose.model("StrellofyUser", StrellofyUserSchema);