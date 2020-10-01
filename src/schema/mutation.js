const { gql } = require('apollo-server');

const typeDefs = gql`
  type Mutation {
    addBook(bookId: Int!, bookName: String!, publishYear: Int, authorIds: [Int]): Book,
    removeBook(bookId: Int!): Book,
  }
`;
module.exports = typeDefs;
