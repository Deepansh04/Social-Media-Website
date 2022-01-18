const Comment = require("../models/comment");
const Post = require('../models/post');

module.exports.create = function (req,res){
    Post.findById(req.body.post,function(err,post){
       
        if(post){
            Comment.create({
                content: req.body.content,
                post : req.body.post,
                user: req.user._id
            },function(err,comment){

               if(err){
                   console.log('error in creating up the post');
               }
               post.comments.push(comment);
               post.save();// to save the added comment in post db
               res.redirect('/');

            });
        }





    });







}
module.exports.destroy = function(req,res){
 Comment.findById(req.params.id, function(err , comment){
     //.id is to convert into string

     if(comment.user == req.user.id){

        let postId = comment.post;

        comment.remove();

        Post.findByIdAndUpdate(postId,{$pull : {comment:req.body.params}},function(err,post){
            return res.redirect('back');
        })
     }else{
         res.redirect('back');
     }





 });



}





