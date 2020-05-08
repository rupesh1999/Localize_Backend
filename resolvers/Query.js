import User from "../models/User";
import getUserId from "../utils/getUserId";
import Network from "../models/Network";

const Query = {
    users: (parent , args , {request} , info) => {
        getUserId(request);
        return User.find({});
    },
    networks: (parent , args , {request} , info) => {
        getUserId(request);
        const data = Network.find({});
        // console.log(data);
        // return [{
        //     networkId: "aasd",
        //     data: "asdwd"
        // }]
        return data;
    }
}

export default Query;