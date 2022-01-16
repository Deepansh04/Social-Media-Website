const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'User'  // name of scema we gave in prevfile in mongoose
    }

},{
    timestamps:true
}
)
const Post = mongoose.model('Post',postSchema);
module.exports=Post;