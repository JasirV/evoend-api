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

const UpdatePost=async (req,res)=>{
    try {
        const {id}=req.params
        const {title,description}=req.body
        if(!id){
            return res.status(404).json({status:"failed",message:"file thie requiredments"})
        }
        if(!title||!description){
            return res.status(404).json({status:'failed',mesage:"required file the "})
        }
        const updatepost=await Post.findByIdAndUpdate(id,{title,description},{new:true})
        if(!updatepost){
            return res.status(404).json({status:'failed',message:"Post not font"}) 
        }
        return res.status(200).json({status:'succees',message:"post update success fully"})
    } catch (error) {
        return res.status(500).json({status:"failed",message:"Internal server error",error:error.message})
    }
}

const getPost =async (req,res)=>{
    try {
        const {id}=req.params
        if(!id){
            const posts=await Post.find()
            return res.status(200).json({status:"success",message:'Post alll fetched',data:posts})
        }
        const post=await Post.findOne(id)
        if(!post){
            return res.status(404).json({status:'failed',message:"Post not font"})
        }
        return res.status(200).json({status:"success",message:"post sucecss fully fecthed",data:post})
        
    } catch (error) {
        return res.status(500).json({status:"failed",message:"Internal server error",error:error.mesage})
    }
}

const deletePost =async (req,res)=>{
    try {
        const {id}=req.params
        if(!id){
            return res.status(400).json({status:'failed',message:"Missing required fields"})
        }
        const deletepost=await Post.findByIdAndDelete(id)
        if(!deletepost){
            return res.status(404).json({status:'failed',mesage:'Post not found'})
        }
        return res.status(200).json({status:"success",mesage:"Post Success Fully Deleted"})
    } catch (error) {
        return res.status(500).json({status:'failed',message:"Internal sever error",error:error.message})
    }
}
const likePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;
  
    if (!postId || !userId) {
      return res.status(400).json({ message: 'Post ID and User ID are required.' });
    }
  
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const likedIndex = post.likes.findIndex((id) => id.equals(userObjectId));
  
      if (likedIndex === -1) {
        post.likes.push(userObjectId);
      } else {
        post.likes.splice(likedIndex, 1);
      }
          await post.save();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  const savePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;
    if (!postId || !userId) {
      return res.status(400).json({ message: 'Post ID and User ID are required.' });
    }
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const savedIndex = post.saves.findIndex((id) => id.equals(userObjectId));
  
      if (savedIndex === -1) {
        post.saves.push(userObjectId);
      } else {
        post.saves.splice(savedIndex, 1);
      }
  
      await post.save();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

module.exports = {createPost,getPost,UpdatePost,deletePost,likePost,savePost};
