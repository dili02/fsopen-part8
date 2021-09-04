const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const subscription = {
  bookAdded: {
    subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
  },
};

module.exports = {
  subscription,
};
