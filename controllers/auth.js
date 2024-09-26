// Here a simple authorization is used. It can be updated to JWT or Oauth2.0
const { User } = require("../models/models");
const authorize = async (req, res) => {
  try {
    const { username, passwd } = req.body;
    const profile = await User.findOne(username);
    if (!username) {
      res.status(404).json({ message: "User Not found" });
    }
    if (profile.psswd == passwd) {
      res.status(201).json({ data: profile, message: "Login successfull" });
    }
    res.status(404).json({ message: "Incorrect credentials" });
  } catch (err) {
    console.error(err);
  }
};

const createUser = async (req, res) => {
  try {
    const { email, username, psswd, name } = req.body;
    const newUser = new User({
      name,
      email,
      username,
      psswd,
    });
    await newUser.save();
    res.status(201).json({ user: newUser, message: "New User created" });
  } catch (err) {
    console.error(err);
  }
};
module.exports = { authorize, createUser };
