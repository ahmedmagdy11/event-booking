const User = require("../../../models/user");
const bcrypt = require("bcrypt");

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

module.exports = createUser;
