const {MongoClient, ObjectID} = require('mongodb');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storyDetailSchema = new Schema({
    category: Array,
    author:   Array,
    view: Number,
    urlImage: String,
    status: String,
    totalChapter: Number,
    numberofSplitChapter: Number,
    content: String
});



var StoryDetail = mongoose.model('StoryDetail', storyDetailSchema);
module.exports = {StoryDetail}