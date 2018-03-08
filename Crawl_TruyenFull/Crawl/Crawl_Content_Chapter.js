/**
 * Created by mac on 2/27/18.
 */
const {MongoClient, ObjectID} = require('mongodb');

var Crawler = require('crawler');
var cheerio = require('cheerio');
var db = require('../db/StoryDb');
var genEpub = require('../Gen/GenEpub');
var chapterDb = require('../db/ChapterDb');
var crawlContent = new Crawler({
    maxConnections: 10,
    callback(error, res, done) {
        if(error) {
            console.log(error);
            console.log('Error in crawl content Chapter')
        } else {
            var $ = res.$;
            var content = $('div').html();
            genEpub.saveChapterContent(content, res.options.title, res.options.storyId, res.options.chapterId)
        }
    }
})

var c = new Crawler({
    maxConnections: 10,
    rateLimit: 1000,
    callback: function(error, res, done) {
        if(error) {
            console.log(error);
        } else {
            var $ = res.$;
            var contentData = $('.detail-content script').text();
            var regChapt = /var nChaptId = (?:\d+)/;
            var regChaptId = /(?:\d+)/;
            var nChaptId = contentData.match(regChapt)[0].match(regChaptId)[0];
            var regChapTime = /(?:\w+)-(?:\w+)-(?:\w+) (?:\w+):(?:\w+):(?:\w+)/;
            var chaptTime = contentData.match(regChapTime)[0].replace(/-| |:/gi, "");
            crawlContent.queue({
                uri: 'http://cf.sstruyen.com/doc-truyen/index.php?ajax=ct&id=' + nChaptId + "&t=" + chaptTime,
                storyId: res.options.storyId,
                chapterId: res.options.chapterId,
                database: res.options.database,
                title: res.options.title
            });
        }
    done();
}
})


module.exports =  {
    crawlContentChapter: function (chapterId, database) {
        chapterDb.findChapterWithId(database, chapterId).then(function (result) {
            c.queue({
                uri: result['url'],
                storyId: result['storyId'],
                chapterId: chapterId,
                database: database,
                title: result['title']
            });
        })

    }
}