
module.exports = {
  books: async (__, filters, {
    dataSources, userId, userRoles
  }, info) => {
    try {
      const result = await dataSources.bookAPI.getBooks(filters);
      return result;
    } catch (err) {
      logger.log(err);
      throw new Error('Unable to fetch Books data');
    }
  },

  authors: async (__, filters, {
    dataSources, userId
  }, info) => {
    try {
      return dataSources.authorAPI.getBooks();
    } catch (err) {
      logger.log(err);
      throw new Error('Unable to fetch family data');
    }
  },
  
  booksQueryWithInputExample: async (__, filters, {
    dataSources, userId
  }, info) => {
    try {
      return dataSources.bookAPI.getBooks();
    } catch (err) {
      logger.log(err);
      throw new Error('Unable to fetch Books data');
    }
  },
};
