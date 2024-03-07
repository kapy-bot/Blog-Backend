//schema of user

import mongoose from "mongoose";

const Schema = mongoose.Schema; //import schema class of mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  blogs: [{
    type: mongoose.Types.ObjectId,
    ref: "Blog",
    required: true,
  }],
});
//export this user collection to db
export default mongoose.model("User", userSchema);
