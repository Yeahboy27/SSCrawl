var asyncLoop = require('node-async-loop');

var editIdChapter = function (db, chapter, next) {
    db.collection('Chapter_Sorted').find().toArray().then(function (result) {
        
    })
    next();
}