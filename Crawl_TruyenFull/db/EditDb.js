var asyncLoop = require('node-async-loop');
var chapterDb  = require('../db/ChapterDb');
var each = require('async-each');
var async = require('async');
var mongoose = require('mongoose');
var i = 1550004;

const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', { keepAlive: 300000, connectTimeoutMS: 300000 },
    function (err, database) {
        if (err) {
            return console.log('Unable Connect Mongodb');
        }
        var dbo = database.db('DBMongo');
        var collection = dbo.collection('Chapter_Sorted');
        collection.find({}, {id: true}).toArray(function (err, result) {
            async.each(result.slice(1550000, 1577439), function (chapter, callback) {
                i += 1
                collection.findOneAndUpdate({
                    "_id": ObjectID(chapter['_id'])
                }, {
                    $set: {
                        id: i
                    }
                }, {
                    new: false
                }, function (err) {
                    if (err) throw err;
                    callback();
                })
            })
        })
    // var cond = collection.aggregate([
    //     {
    //         $group: {
    //             _id: {id: "$id"},
    //             count: {$sum: 1},
    //             docs: {$push: "$_id"}
    //         }
    //     }, {
    //         $match: {
    //             count: {$gt : 1}
    //         }
    //     }
    // ], {
    //     allowDiskUse: false
    // }, function (err, result) {
    //     if(err) throw  err;
    //     console.log(result);
    // })

})


