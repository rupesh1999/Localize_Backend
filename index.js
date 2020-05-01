const { GraphQLServer } = require("graphql-yoga");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolver");

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
