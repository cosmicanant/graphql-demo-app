const authorLoader = require('../dataLoaders/authors');
const bookLoader = require('../dataLoaders/books');

module.exports = {
  Book: {
    authors: async (parent, __, { dataSources, userId }) => {
      let authors = [];
      if (typeof parent.authors === 'undefined') {
        authors = await authorLoader.load({
          ids: parent.authorIds,
          authorAPI: dataSources.authorAPI,
        });
      }
      return authors;
    },
  },
  Author: {
    books: async (parent, __, { dataSources, userId }) => {
      let books = [];
      if (typeof parent.books === 'undefined') {
        books = await bookLoader.load({
          authorId: parent.id,
          bookAPI: dataSources.bookAPI,
        });
      }
      return books;
    },
  },
};
