const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        user: () => {
            return {
                name: "Rupesh Mishra",
                age: 20
            }
        }
    }
};


module.exports = resolvers;