import mongoose, { mongo } from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs FOund" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "unable to find user by this id " });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    existingUser.blogs.push(blog);
    await existingUser.save({session})
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message:err });
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "unable to update" });
  }

  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const Id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(Id);
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "no blog found" });
  }

  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const Id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndDelete(Id);
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "unable to delete" });
  }

  return res.status(200).json({ message: "blog has been deleted" });
};
