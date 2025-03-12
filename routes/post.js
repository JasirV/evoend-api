const express =require('express')
const { createPost, getPost, deletePost, UpdatePost, likePost, savePost } = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')
const Router =express.Router()

Router.post('/',createPost)
.get('/:id',getPost)
.delete('/:id',deletePost)
.put('/:id',UpdatePost)
.post('/like/:postId', authMiddleware, likePost)
.post('/save/:postId', authMiddleware, savePost)

module.exports=Router