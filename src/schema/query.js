const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
  books(ids: [Int], authorIds: [Int]): [Book]
  authors(id: [Int], bookIds: [Int]): [Author]
  booksQueryWithInputExample(input: bookFilters): [Book]
}
`;
module.exports = typeDefs;
