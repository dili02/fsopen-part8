const Book = require("../models/book");
const Author = require("../models/author");

const author = {
  bookCount: async (root) => {
    const author = await Author.findOne({
      name: root.name
    })

    const book = await Book.find({
      author: author.id
    })

    return book.length
  },
};

module.exports = {author}
