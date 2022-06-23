const {Schema, model,Types:{ObjectId}} = require('mongoose');

const  URL_PATTERN = /^http?::\/\/(.+)$/;

const postSchema = new Schema({
    title:{
        type:String,
        required:true,
        minlenght:[6, 'Title must be at lest 6 characters long']
    },
    keyword:{
        type:String,
        required:true,
        minlenght:[6, 'Title must be at lest 6 characters long']
    },
    location:{
        type:String,
        required:true,
        maxlenght:[15, 'Title must be the most 15 characters long']
    },
    date:{
        type:String,
        required:true,
        minlenght:[10, 'Data must be 10 characters long'],
        maxlenght:[10, 'Data must be 10 characters long'],

    },
    image:{
        type:String,
        validate:{
            validator(value){
              return URL_PATTERN.test(value)  
            },
            message:'Image must be a valid URL'
        },
    },
    description:{
        type:String,
        minlength:[8,'Description at least 8 chars']
    },
    author:{
        type: ObjectId, 
        ref:'User',
        require:true,
    },
    votes:{
        type: [ObjectId], 
        ref:'User',
        default:[]
    },
    rating:{
        type: Number, 
        default:0
    }
});

const Post = model('Post',postSchema);

module.exports = Post;