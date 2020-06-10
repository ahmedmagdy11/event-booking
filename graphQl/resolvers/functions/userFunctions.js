const User = require("../../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUser = async (args) => {
  args = args.userData;
  console.log(args);
  try {
    const Found = await User.findOne({ email: args.email }).exec();
    if (Found == null) {
      let password = await bcrypt.hash(args.password, 10);
      args.password = password;
      const doc = await User.create(args);
      console.log(doc);
      return doc;
    } else {
      return new Error("user with the same email exists");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const login = async (args) => {
  try {
    const doc = await User.findOne({ email: args.email }).exec();
    if (!doc) {
      throw new Error(`User Doesn't exist`);
    }
    const compare = await bcrypt.compare(args.password, doc.password);
    if (!compare) {
      throw new Error(`password is incorrect`);
    }
    const token = jwt.sign({ userID: doc._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1000s",
    });

    return {
      userID: doc._id,
      token: token,
      expirationDate: 1000,
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { createUser: createUser, login: login };
