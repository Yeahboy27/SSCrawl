/**
 * Created by mac on 2/27/18.
 */
var Epub = require("epub-gen");
var option = {
    title: "Alice's Adventures in Wonderland", // *Required, title of the book.
    author: "Lewis Carroll", // *Required, name of the author.
    content: [
        {
            title: "About the author", // Optional
            author: "John Doe", // Optional
            data: "<h2>Charles Lutwidge Dodgson</h2>"
            +"<div lang=\"en\">Better known by the pen name Lewis Carroll...</div>" // pass html string
        },
        {
            title: "Down the Rabbit Hole",
            data: "<p>Alice was beginning to get very tired...</p>"
        },
]
};

module.exports = {
    saveChapterContent: function (data, title, storyId, chapterId) {
        option.title = title;
        option.content = [{
            title: title,
            data: data
        }]
        console.log('Success creat epub File')
        new Epub(option, "../Gen/DataChapter/"+storyId+"/"+chapterId+".epub");
    }
}


