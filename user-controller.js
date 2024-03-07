import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  //req- what we req front frontend like req.body req.header
  let users; //all users are allowed to use this route
  try {
    //always used when using db as db can fail as well when gets error
    users = await User.find(); //gets the documents that mathces the filter
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    // added validation for unknown user or if user if false
    return res.status(404).json({ message: "No user FOund" });
  }
  return res.status(200).json({ users });
}; // now use this controller in routing for user

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body; // we will receive this infro from fend postman req.body
  let existingUser; // if user is already available in DB add validation for that
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "user exists areaday login instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    // if the user doesnt exist- create new user
    name,
    email,
    password: hashedPassword,
    blog:[]
  });
  // use try catch to save the new user to db
  try {
    await user.save(); // to save the user
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user }); //created
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "could not find user by this email and password" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "incorrect password" });
  }
  return res.status(200).json({ message: "Login successful" });
};
