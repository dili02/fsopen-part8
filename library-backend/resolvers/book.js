const Book = require("../models/book");
const Author = require("../models/author");

const book = {
  author: async (root, args) => {
    const id = root.author;

    const author = await Author.findOne({
      id
    }).populate('author')

    return {
      name: author.name,
      born: author.born,
      bookCount: author.books.length,
      id: root.author._id,
    };
  },
};

module.exports = { book };
