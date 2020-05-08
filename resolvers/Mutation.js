import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import keys from "../constants/keys";
import getUserId from "../utils/getUserId";
import Network from "../models/Network";

const Mutation = {
  addUser: async (parent, args, ctx, info) => {
    const check = await User.findOne({
      email: args.data.email
    });
    if (check) {
      throw new Error("Email already exists, go to login page");
    }
    let data = args.data;
    if (args.data.networkId === null) {
      data = { ...data, networkId: null };
    }
    const user = new User(data);
    user
      .save()
      .then(() => console.log("user saved"))
      .catch(e => {
        throw new Error("something went wrong");
      });
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
  addNetwork: async (parent, args, { request }, info) => {
    const userId = getUserId(request);
    console.log(userId);
    const network = new Network({ data: args.data.geoJSON });
    try {
      const data = await network.save();
      User.update(
        { _id: userId },
        {
          networkId: data.id
        }
      )
        .then(res => console.log(res))
        .catch(e => console.log(e));
    } catch (err) {
      throw new Error("something went wrong");
    }

    return {
      networkId: network.id
    };
  }
};

export default Mutation;
