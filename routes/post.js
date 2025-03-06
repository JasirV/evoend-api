const express =require('express')
const { createPost, getPost, deletePost, UpdatePost } = require('../controllers/postController')
const Router =express.Router()

Router.post('/',createPost)
.get('/:id',getPost)
.delete('/:id',deletePost)
.put('/:id',UpdatePost)

module.exports=Router