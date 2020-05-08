import User from "../models/User";
import getUserId from "../utils/getUserId";

const Query = {
    users: (parent , args , {request} , info) => {
        getUserId(request);
        return User.find({});
    }
}

export default Query;