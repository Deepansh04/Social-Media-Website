{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-container>ul').prepend(newPost);
                    $('#post-content').val('');
                    deletePost($(' .post-delete-button >a', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    // let newPostDom = function(post){
    //     // CHANGE :: show the count of zero likes on this post
    //     return $(`<li id="post-${post._id}">
    //                 <p>
                        
    //                     <small>
    //                         <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
    //                     </small>
                       
    //                     ${ post.content }
    //                     <br>
    //                     <small>
    //                     ${ post.user.name }
    //                     </small>
    //                     <br>
    //                     <small>
                            
    //                             <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
    //                                 0 Likes
    //                             </a>
                            
    //                     </small>

    //                 </p>
    //                 <div class="post-comments">
                        
    //                         <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
    //                             <input type="text" name="content" placeholder="Type Here to add comment..." required>
    //                             <input type="hidden" name="post" value="${ post._id }" >
    //                             <input type="submit" value="Add Comment">
    //                         </form>
               
                
    //                     <div class="post-comments-list">
    //                         <ul id="post-comments-${ post._id }">
                                
    //                         </ul>
    //                     </div>
    //                 </div>
                    
    //             </li>`)
    // }


    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            //  console.log(deleteLink,"**");
            //  console.log($((deleteLink).prop('href'))); 
            //  console.log($(deleteLink>a).prop('href'));
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let newPostDom = function (post) {
        if(post.user.avatar){
        return $(`<li id="post-${post._id}">
        <div class="post-card">
            <div class="post-card-header">
                <img src="${post.user.avatar}" alt="${post.user.name}" class="post-user-profile-pic">&nbsp;&nbsp;
                <div class="user-name">
                    <a href="/users/profile/${post.user._id}">${post.user.name}</a>
                </div>
                <div class="post-delete-button delete-post-button"><a href="/posts/destroy/${post._id}"><i class="fas fa-times"></i></a>
                </div>
            </div>
    
            <div class="post-content">
                ${post.content}
            </div>
            <div class="likes-count likes-count-p"><b>
               
              
            <a class="toggle-like-button" data-likes="${post.likes.length}"
                href="/likes/toggle/?id=${post._id}&type=Post">
                <i class="far fa-thumbs-up"></i>&nbsp;&nbsp; ${ post.likes.length }  Likes
            </a>
           
    </div>
           
            <div class="comments-container">
                <form action="/comments/create" method="POST" id="comment-form-${post._id}">
                        <textarea id="comment-content" name="content" placeholder="Add comment" rows="2" cols="20"
                        required></textarea>
                        <input type="hidden" name="post_id" value="${post._id}" style="display: none;">
                        <button type="submit">Add comment</button>
                </form>
                <div class="posted-comments" id="posted-comments-${post._id}">
    
                    <ul type="none">    
                    </ul>
                </div>
                    
            </div>
        </div>
    </li>`);}else{
        return $(`<li id="post-${post._id}">
        <div class="post-card">
            <div class="post-card-header">
                <img src="/images/default-avatar.jpg" alt="${post.user.name}" class="post-user-profile-pic">&nbsp;&nbsp;
                <div class="user-name">
                    <a href="/users/profile/${post.user._id}">${post.user.name}</a>
                </div>
                <div class="delete-post-button"><a href="/posts/destroy/${post._id}"><i class="fas fa-times"></i></a>
                </div>
            </div>
    
            <div class="post-content">
                ${post.content}
            </div>
            </div>
            <div class="likes-count likes-count-p"><b>
               
              
            <a class="toggle-like-button" data-likes="${post.likes.length}"
                href="/likes/toggle/?id=${post._id}&type=Post">
                <i class="far fa-thumbs-up"></i>&nbsp;&nbsp; ${ post.likes.length }  Likes
            </a>
           
    </div>
            <div class="comments-container">
                <div class="posted-comments" id="posted-comments-${post._id}">
    
                    <ul type="none">    
                    </ul>
                </div>
                    <form action="/comments/create" method="POST" id="comment-form-${post._id}">
                        <textarea id="comment-content" name="content" placeholder="Add comment" rows="2" cols="20"
                        required></textarea>
                        <input type="hidden" name="post_id" value="${post._id}" style="display: none;">
                        <button type="submit">Add comment</button>
                    </form>
            </div>
        </div>
    </li>`)
    }

    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .post-delete-button>a', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}