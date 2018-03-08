const {MongoClient, ObjectID} = require('mongodb');
var crawlStoryDetail = require('../Crawl/Crawl_Detail_Comic');
var db = require('../db/StoryDb');
var fs = require('fs');
var crawlChapter = require('../Crawl/Crawl_All_Chapter');
var sortDb = require('../db/SortCollection');
var genEpub = require('../Gen/GenEpub');
var asyncLoop = require('node-async-loop');


var crawlContentChapter = require('../Crawl/Crawl_Content_Chapter');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, database) => {
    if(err) {
        return console.log('Unable Connect Mongodb');
    }
    var chaptId = [];
    // for(var i = 15250; i < 15266; i++) {
    //     db.findStoryWithId(database, i).then(function (items) {
    //         if(items['totalChapter'] != null) {
    //             setTimeout(function () {
    //             }, 3000)
    //             chaptId = chaptId + items['totalChapter']+500
    //             crawlChapter.crawlChapterStory(database,items['id'], chaptId);
    //         }
    //     }, function(err) {
    //         console.error('The promise was rejected', err, err.stack);
    //     })
    // }
    // for(var i = 70; i < 100; i++) {
    //     // chaptId.push(i);
    //     crawlContentChapter.crawlContentChapter(i, database);
    // }
    //
    // var crawlChapter = function (id, next) {
    //     crawlContentChapter.crawlContentChapter(id, database);
    //     setTimeout(function (
    //     ) {
    //     }, 8000);
    //     next();
    // }

    // asyncLoop(chaptId, crawlChapter);

    crawlContentChapter.crawlContentChapter(68, database);
    crawlContentChapter.crawlContentChapter(69, database);
    crawlContentChapter.crawlContentChapter(70, database);



    // sortDb.sortChapter(database)
    // crawlContentChapter.crawlContentChapter('http://sstruyen.com/doc-truyen/ngon-tinh/ac-phu-duong-dao/tiet-tu/346390.html', 5, 1488, database);
})


