// const { GraphQLServer } = require("graphql-yoga");
import {GraphQLServer} from "graphql-yoga";
import Query from "./resolvers/Query";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const getData = async () => {
    const user = await prisma.user.create({
        data: {
          name: "Rupesh",
          email: "rs.rupesh95@gmail.com",
          password: "abc123"
        }
      })
    console.log(user);
}

getData().catch(e => console.log(e));
console.log("good thing");
const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers: {
        Query
    },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
