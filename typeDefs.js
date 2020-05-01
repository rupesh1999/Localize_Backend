const typeDefs = `
type Query {
  info: String!
  user: User!
}
type User{
    name: String!
    age: Int!
}
`;

module.exports = typeDefs;