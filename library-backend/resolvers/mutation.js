const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require('jsonwebtoken')
const Book = require("../models/book");
const Author = require("../models/author");
const User = require("../models/user")

const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

const mutation = {
  addBook: async (root, args, context) => {
    const currentUser = context.currentUser

    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }

    let book = await Book.findOne({
      title: args.title,
    });

    if (book) {
      throw new UserInputError("Book already exists", {
        invalidArgs: args.title,
      });
    }

    let author = await Author.findOne({
      name: args.author,
    });

    if (author) {
        book = new Book({
            ...args,
            author,
          });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    }

    if (!author) {
      author = new Author({
        name: args.author,
      });
      book = new Book({
        ...args,
        author,
      });
      try {
        await author.save();
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    }

    return book;
  },
  editAuthor: async (root, args, context) => {
    const currentUser = context.currentUser

    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }

    let author = await Author.findOne({
        name: args.name,
    });

    if (!author) return null;

    author.born = args.setBornTo

    try {
        await author.save()
    } catch (error) {
        throw new UserInputError(error.message, {
            invalidArgs: args
        })
    }

    return author
  },
  createUser: async (root, args) => {
    const user = new User({
      ...args
    })

    try {
      await user.save()
    } catch (error) {
      throw new UserInputError(
        error.message, {
          invalidArgs: args
        }
      )
    }

    return user
  },
  login: async (root, args) => {
    const user = await User.findOne({
      username: args.username
    })

    if (!user || args.password !== "secret") {
      throw new UserInputError("Wrong Credentials")
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    return {
      value: jwt.sign(userForToken, JWT_SECRET)
    }
  }
};

module.exports = {
  mutation
};
