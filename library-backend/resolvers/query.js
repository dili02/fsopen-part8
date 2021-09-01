const Book = require("../models/book");
const Author = require("../models/author");

const query = {
  me: (root, args, context) => {
    return context.currentUser
  },
  bookCount: () => Book.collection.countDocuments(),
  authorCount: () => Author.collection.countDocuments(),
  allAuthors: async () => await Author.find({}),
  allBooks: async (root, args) => {
    if (!args.author && !args.genre) {
      return await Book.find({}).populate("author");
    }

    if (args.author) {
      const author = await Author.findOne({
        name: args.author,
      });
      const book = await Book.find({
        author: {
          $in: author.id,
        },
      }).populate("author");
      return book;
    }

    if (args.genre) {
      const book = await Book.find({
        genres: {
          $in: args.genre,
        },
      }).populate("author");
      return book;
    }

    if (args.author && args.genre) {
      const author = await Author.findOne({
        name: args.author,
      });

      const book = await Book.find({
        $and: [
          {
            author: {
              $in: author.id,
            },
          },
          {
            genres: {
              $in: args.genre,
            },
          },
        ],
      }).populate("author");

      return book
    }
  }
};

module.exports = { query };
