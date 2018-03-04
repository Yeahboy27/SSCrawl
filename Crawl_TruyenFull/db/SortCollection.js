var MongoClient = require('mongodb').MongoClient;
var {Story} = require('../Model/Story');
var asyncLoop = require('node-async-loop');
module.exports = {
    sortDb: function(db, nameCollection, sortedBy) {
        var dbo = db.db('DBMongo');
        // dbo.collection('Story').find().sort({'id': 1}).toArray(function (err, doc) {
        //     if(err) throw  err;
        //     dbo.collection('Story_Sorted').insertMany(doc, function (err, doc) {
        //         if(err) throw err;
        //         console.log('Created new collection');
        //     })
        // })
        dbo.collection('Story').find({id: 16000}).toArray(function (err, doc) {
            if(err) throw  err;
            console.log(doc.length);
        })
    },

    sortChapter: function (db) {
        var dbo = db.db('DBMongo');

        var pushItemMongoDb = function (item, next) {
            dbo.collection('Chapter').find({'storyId': item}).toArray(function (err, result) {
                if(err) throw err;
                if(result.length > 0) {
                    dbo.collection('Chapter_Sorted').insertMany(result, function (err) {
                        if(err) throw err;
                        next();
                    })
                } else {
                    next();
                }
            })

        }

        var displayItem = function(item, next) {
            console.log(item);
            next();
        }

        var array = []
        for(var i = 15256; i < 15266; i++) {
            array.push(i);
        }
        setTimeout(function () {
            asyncLoop(array, pushItemMongoDb);
        }, 5000);
    }
}

