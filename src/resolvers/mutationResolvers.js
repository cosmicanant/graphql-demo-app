module.exports = {
  addBook: async (parent, args, { dataSources }, info) => {
    const response = await dataSources.bookAPI.addBook(
      args
    );
    return response;
  },
};


// POST type: query{ }
// 

// GET /book - [{id, name, authorIds: [1, 2]}]
// POS /book
// GET /author
// post /book
// 