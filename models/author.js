var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, max: 100},
  family_name: { type: String, required: true, max: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date }
});

//Getting virtual field called first_name
AuthorSchema
.virtual('name')
.get(function() {
  return this.first_name + ', ' + this.family_name;
});

AuthorSchema
.virtual('url')
.get(function() {
  return '/catalog/author/'+ this._id;
});

AuthorSchema
.virtual('date_birth_formatted')
.get(function() {
    return moment(this.date_of_birth).format('MMMM Do, YYYY');
});

AuthorSchema
.virtual('date_death_formatted')
.get(function() {
    return moment(this.date_of_death).format('MMMM Do, YYYY');
});

AuthorSchema
.virtual('lifespan')
.get(function() {
    var lifespan = '';
    lifespan=moment(this.date_of_birth).format('MMMM Do, YYYY');
    lifespan+=' - ';
    lifespan+=moment(this.date_of_death).format('MMMM Do, YYYY');
    return lifespan;
});

module.exports = mongoose.model('Author', AuthorSchema);
