import User from "../models/User";

const Query = {
    users: () => {
        return User.find({});
    }
}

export default Query;