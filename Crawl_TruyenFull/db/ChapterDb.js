var MongoClient = require('mongodb').MongoClient;

module.exports = {
    addNewChapter: function (db, id, url, title, storyId) {
        var dbo = db.db('DBMongo');
        dbo.collection('Chapter').insertOne({
            id: id,
            title:  title,
            url: url,
            storyId: storyId,
        }, (err, result) => {
            if (err) {
                return console.log('Unable to insert todo', err);
            }
        });
    },

    findChapterWithId: function (db, chapterId) {
        var dbo = db.db('DBMongo');
        return dbo.collection('Chapter_Sorted').find({id: chapterId}).toArray().then((docs) => {
            return docs[0];
        }).then(function (items) {
            return items;
        });
    }



}