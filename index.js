import "@babel/polyfill/noConflict";
import { GraphQLServer } from "graphql-yoga";
import Query from "./resolvers/Query";
import mongoose from "mongoose";
import Mutation from "./resolvers/Mutation";
const port = process.env.PORT || 4000;
mongoose
    .connect("mongodb://admin:pwd123@ds127115.mlab.com:27115/localize", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("mongodb connected");
    });

const server = new GraphQLServer({
    typeDefs: "./schema.graphql",
    resolvers: {
        Query,
        Mutation
    }
});
server.start(
    {
        port,
        cors: {
            origin: "*",
        },
        playground: "/graphql"
    },
    () => console.log(`Server is running on http://localhost:4000`)
);
