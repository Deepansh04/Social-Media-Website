const post = require('../models/post');

module.exports.create = function(req,res){
    post.create({
        content: req.body.content,
        user: req.user._id // from passport

    }, function(err,post){
        if(err){console.log('Error in creating a post'); return;}
        return res.redirect('back'); 
    });

  

}