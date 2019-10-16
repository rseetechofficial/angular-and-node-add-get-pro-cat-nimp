var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    title : {type : String},
    description : {type : String},
    price : {type : Number},
    category : {type : Schema.Types.ObjectId,ref : 'Category'}
})

module.exports = mongoose.model('Product',ProductSchema)