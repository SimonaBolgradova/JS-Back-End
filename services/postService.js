const Post = require('../models/Post')

async function createPost(post){
    const result = new Post(post);
    await result.save();
    
    return result
}

async function getPosts(){
    return Post.find({})
}

async function getPostById(id){
    return Post.findById(id).populate('author', 'firstName lastName');
}

async function updatePost(id,post){
    const existing = await Post.findById(id);

    existing.title= post.title;
    keyword=post.keyword;
    location=post.location;
    date=post.date;
    image= post.image;
    description= post.description;

    await existing.save();
}

async function deletePost(id){
    return Post.findByIdAndDelete(id);
}

async function vote(postId, userId, value){
    const post = await Post.findById(postId);

    if(post.votes.includes(userid)){
        throw new Error('User has already voted')
    }

    post.votes.push(userId);
    post.rating += value;
}

module.exports={
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    vote
}