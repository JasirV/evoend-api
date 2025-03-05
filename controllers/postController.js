const Post = require('../models/Post'); 


const createPost = async (req, res) => {
  try {
    const { title, description, imageUrl, author } = req.body;

    if (!title || !description || !author) {
      return res.status(400).json({ status: "failed", message: "Missing required fields" });
    }

    const newPost = await Post.create({ title, description, imageUrl, author });

    return res.status(201).json({ status: "success", message: "Post created successfully", data: newPost });

  } catch (error) {
    return res.status(500).json({ status: "failed", message: "Internal server error", error: error.message });
  }
};

const deletePost =async (req,res)=>{
    try {
        const {id}=req.params
        if(!id){
            return res.status(400).json({status:'failed',message:"Missing required fields"})
        }
        const deletepost=await Post.findByIdAndDelete(id)
        if(!deletePost){
            return res.status(404).json({status:'failed',mesage:'Post not found'})
        }
        return res.status(200).json({status:"success",mesage:"Post Success Fully Deleted"})
    } catch (error) {
        return res.status(500).json({status:'failed',message:"Internal sever error",error:error.message})
    }
}

module.exports = createPost;
