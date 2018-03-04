/**
 * Created by mac on 2/19/18.
 */
var {Chapter} = require('../Model/Chapter');

var Crawler = require('crawler');
var fs = require('fs');
var cheerio = require('cheerio');
var db = require('../db/StoryDb');
var dbChapter = require('../db/ChapterDb');

var c = new Crawler({
    maxConnections: 10,
    rateLimit: 2000,
    callback: function(error, res, done) {
        if(error) {
            console.log(error)
        } else {
            var $ = res.$;
            if($('.truyeninfo img').attr('src') == null) {
                console.log('No story at idStory %d', res.options.storyId);
            } else {
             var chaptId = res.options.startChaptId;
             if(res.options.type) {
                var listChapter = $('.m10t').children().eq(0).html();
             } else {
                 var listChapter = $('.m10t').children().eq(1).html();
             }
            $ = cheerio.load(listChapter);
            var allChapter = $('.chuongmoi').children().each(function (i, element) {
                chaptId += 1;
                var titleChapter = $(this).children().attr('title');
                var chapterHTML = $(this, 'div').html();
                $ = cheerio.load(chapterHTML);
                // var chapterId = $('div').text();
                // chapterId = chapterId.substring(0, chapterId.length -1);
                var urlChapter = 'http://sstruyen.com' + $('a').attr('href');
                dbChapter.addNewChapter(res.options.database, chaptId, urlChapter,titleChapter, res.options.storyId);
            })

        }}
        done();
    }
})

// c.queue({
//     uri: 'http://sstruyen.com/doc-truyen/anh-hai-gap-chi-dai/11299.html',
//     storyId: 121,
//     startChaptId: 5000
// });
// c.queue('http://sstruyen.com/doc-truyen/hao-mon-thien-gioi-tien-the-anh-dung-yeu-em/15481.html');
// c.queue({
//     uri:'http://sstruyen.com/doc-truyen/hao-mon-thien-gioi-tien-the-anh-dung-yeu-em/15481.html',
//     storyId: "292828",
// })

module.exports = {
    crawlChapterStory: function (database,storyId,startChaptId) {
        db.findStoryWithId(database, storyId).then(function (result) {
            if(result['totalChapter'] == null) {
                console.log('No comic at ' + storyId);
            } else {
                if(result['numberofSplitChapter'] == null) {
                    c.queue({
                        uri: result['url'],
                        storyId: storyId,
                        startChaptId: startChaptId,
                        type: true,
                        database: database
                    })
                } else {
                    for(var i = 0; i < result['numberofSplitChapter']; i++) {
                        startChaptId += 51;
                        c.queue({
                            uri: result['url'].substr(0, result['url'].length-5)+'/page-' +String(i)+ '.html#chaplist',
                            storyId: storyId,
                            startChaptId: startChaptId,
                            type: false,
                            database: database
                        })
                    }
                }
            }
        })
    }
}
