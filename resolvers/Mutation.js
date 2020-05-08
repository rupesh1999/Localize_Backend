import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import keys from "../constants/keys";
import getUserId from "../utils/getUserId";
import Network from '../models/Network';

const Mutation = {
    addUser: async (parent, args, ctx, info) => {
        const check = await User.findOne({
            email : args.data.email 
        });
        if(check){
            throw new Error("Email already exists, go to login page");
        }
        const user = new User(args.data);
        user.save()
            .then(() => console.log("user saved"))
            .catch(e => console.log(e));
        return user;
    },
    login: async (parents, args, ctx, info) => {
        const user = await User.findOne({
            email: args.data.email
        });


        if (!user) {
            throw new Error("User does not exist, signup first");
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password);

        if (!isMatch) {
            throw new Error("Wrong password entered");
        }
        delete user["password"];
        let token = jwt.sign(user.toJSON(), keys.secretOrKey, {
            expiresIn: 7 * 24 * 60 * 60 //1 week in in seconds
        });

        return {
            success: true,
            msg: "authentication successful",
            token: "Bearer " + token,
            user: user
        };
    },
    addNetwork: (parent , args , {request} , info) => {
        const userId = getUserId(request);

        const network = new Network(args.data);

        network.save()
        .then(() => console.log("network saved"))
        .catch(e => console.log(e));

        return {
            networkId: network.id
        }
    }
};

export default Mutation;
