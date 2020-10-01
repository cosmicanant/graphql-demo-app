const { gql } = require('apollo-server');

const typeDefs = gql`
  type Author {
    id: ID!
    email: String
    name: String
    books: [Book]
  }
  type Book {
    id: ID!
    name: String
    publishYear: Int
    authors: [Author]
  }

  input bookFilters {
    id: ID,
    authorId: [Int]
  }
`;
module.exports = typeDefs;
