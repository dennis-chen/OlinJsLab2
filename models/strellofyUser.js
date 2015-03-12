// Mongo Model for a Song.
// Keeps track of what songs have been added.

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

var StrellofyUserSchema = mongoose.Schema();
StrellofyUserSchema.plugin(findOrCreate);

module.exports = mongoose.model("StrellofyUser", StrellofyUserSchema);