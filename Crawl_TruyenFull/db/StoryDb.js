/**
 * Created by mac on 2/20/18.
 */
var MongoClient = require('mongodb').MongoClient;
var crawlDetailComic = require('../Crawl/Crawl_Detail_Comic');

module.exports = {
    findStoryWithId: function(db, storyId) {
        // return MongoClient.connect('mongodb://localhost:27017/TodoApp').then(function(db) {
        var dbo = db.db('DBMongo');
        return dbo.collection('Story').find({id: storyId}).toArray().then((docs) => {
            return docs[0];
        }).then(function (items) {
            return items;
        });
    },

    updateStoryWithId: function (db, storyId, numberOfSplit, category, author, totalChapter, content, urlImage, view,status) {
        var dbo = db.db('DBMongo');
        var collection = dbo.collection('Story');
        collection.findOneAndUpdate({id: storyId},
            {
                $set: {
                    numberofSplitChapter: numberOfSplit,
                    category: category,
                    totalChapter: totalChapter,
                    content: content,
                    urlImage: urlImage,
                    view: view,
                    status: status,
                    author: author
                },
            },
            {
                new: false
            }, function (err, doc) {
                if (err) {
                    return console.log(err);
                }
            }
        );
    },

    updateForCrawlNewChapter: function (db, storyId, numberOfSplit, category, author, totalChapter, content, urlImage, view,status) {
        var dbo = db.db('DBMongo');
        var collection = dbo.collection('Story');
        collection.findOneAndUpdate({id : storyId},
            {
                $set: {
                    numberofSplitChapter: numberOfSplit,
                    category: category,
                    totalChapter: totalChapter,
                    content: content,
                    urlImage: urlImage,
                    view: view,
                    status: status,
                    author: author
                },
            },
            {
                new: false
            }, function (err, docs) {
                if(err) {
                    return console.log(err);
                }
                return docs;
            }
        ).then(function (item) {
            return item;
        });
    },

    updateStoryWithStoryDetail: function (db, storyId, storyDetail) {
        var dbo = db.db('DBMongo');
        var collection = dbo.collection('Story');
        collection.findOneAndUpdate({
            id: storyId
        }, {
            $set: {
                numberofSplitChapter: storyDetail.numberofSplitChapter,
                category: storyDetail.category,
                totalChapter: storyDetail.totalChapter,
                content: storyDetail.content,
                urlImage: storyDetail.urlImage,
                view: storyDetail.view,
                status: storyDetail.status,
                author: storyDetail.author
            }
        }, function (err, doc) {
            if(err) {
                console.log('Some thing wrong when update');
                return console.log(err);
            }
        })
    },

    findStoryWithUrl: function (db, url) {
        var dbo = db.db('DBMongo');
        var collection = dbo.collection('Story');
        collection.find({
            url: url
        }).toArray().then(function (items) {
            return items;
        })
    },

    addNewStory: function (db,storyDetail, url, title, newChapter, updateTime) {
        var dbo = db.db('DBMongo');
        var collection = dbo.collection('Story');
        var dbo = db.db('DBMongo');
        dbo.collection('Story').insertOne({
            id: dbo.collection('Story').count()+8000,
            title:  title,
            url: url,
            updateTime: updateTime,
            newChapter: newChapter,
            numberofSplitChapter: storyDetail.numberOfSplit,
            category: storyDetail.category,
            totalChapter: storyDetail.totalChapter,
            content: storyDetail.content,
            urlImage: storyDetail.urlImage,
            view: storyDetail.view,
            status: storyDetail.status,
            author: storyDetail.author
        }, (err, result) => {
            if (err) {
                return console.log('Unable to insert todo', err);
            }
            console.log('Add new Story' + result);
        });
        db.close();
    },

    addNewStoryWithUrl: function (db, index, url, title, newChapter, updateTime) {
        var dbo = db.db('DBMongo');
        var collection = dbo.collection('Story');
        var dbo = db.db('DBMongo');
        dbo.collection('Story').insertOne({
            id: dbo.collection('Story').count()+8000+ index,
            title:  title,
            url: url,
            updateTime: updateTime,
            newChapter: newChapter,
        }, (err, result) => {
            if (err) {
                return console.log('Unable to insert todo', err);
            }
            crawlDetailComic.crawlNewStory(db, result['id'], url);
            console.log('Add new Story' + result);
        });
        db.close();
    }
};

