import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const keys = {
    secretOrKey: "mycompletelyhiddensecretkey"
};

const Mutation = {
    addUser: async (parent, args, ctx, info) => {
        const check = await User.findOne({
            email : args.data.email 
        });
        if(check){
            return {
                name: "",
                email: ""
            }
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
            throw new Error("Unable to login");
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password);

        if (!isMatch) {
            throw new Error("Unable to login");
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
    }
};

export default Mutation;
