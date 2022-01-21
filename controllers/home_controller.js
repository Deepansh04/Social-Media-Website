const Post=require('../models/post');
const User = require('../models/user');


module.exports.home = async function(req, res){

    try{
         // populate the user of each post
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    
        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()

// module.exports.home=function(req,res){
//     // console.log(req.cookies);
//     // Post.find({},function(err,posts){
//     //     return res.render('home',{
//     //         title:"Codial | Home",
//     //         posts:posts
//     //     });
//     // });  
//     Post.find({}).populate('user')
//     .populate({
//         path: 'comments',
//         populate:{
//             path: 'user'
//         }
//     })
//     .exec(function(err, posts){
//         User.find({},function(err,users){

//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts:  posts,
//                 all_users:users
//             });
//         });
      
//     })

// }