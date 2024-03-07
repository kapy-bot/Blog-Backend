import mogoose from "mongoose";

const Schema = mogoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mogoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mogoose.model("Blog", blogSchema);
