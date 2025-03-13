const express =require('express')
const { createPost, getPost, deletePost, UpdatePost, likePost, savePost } = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')
const Router =express.Router()

Router.post('/',authMiddleware,createPost)
.get('/:id',getPost)
.delete('/:id',authMiddleware,deletePost)
.put('/:id',authMiddleware,UpdatePost)
.post('/like/:postId', authMiddleware, likePost)
.post('/save/:postId', authMiddleware, savePost)

module.exports=Router