/**
 * Created by mac on 2/27/18.
 */
var Epub = require("epub-gen");
var option = {
    title: "Alice's Adventures in Wonderland", // *Required, title of the book.
    tocTitle: "",
    content: [
    ]
};

module.exports = {
    saveChapterContent: function (data, title, storyId, chapterId) {
        option.title = title;
        option.content = [{
            title: title,
            data: data,
            beforeToc: false
        }];
        new Epub(option, "../Gen/DataChapter/"+storyId+"/"+chapterId+".epub").promise.then(function (){

        }, function (err) {
            console.error("Failed to generate Ebook because of ", err)
        });
    }
}


