// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        // this.newCommentForm = $(`#post-${postId}-comments-form`);
        this.newCommentForm = $(`#comment-form-${postId}`);
        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button>a', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($('.delete-comment-button>a', newComment));
                    $('.comment-content').val('');
                    // CHANGE :: enable the functionality of the toggle like button on the new comment
                    new ToggleLike($(' .toggle-like-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
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


    newCommentDom(comment){
        // CHANGE :: show the count of zero likes on this comment
        if(comment.user.avatar){
            return $(`<li id="comment-${comment._id}">
            <div class="comment-user-profile-pic">
                <img src="${comment.user.avatar}">
            </div>
            <div class="comment-card">
                <div class="comment-user-name">
                    <div>
                    <a href="/users/profile/${comment.user.id}">${comment.user.name}</a></div>
                    <a href="/comments/destroy/${comment._id}" class="delete-comment-button"><i class="fas fa-times"></i></a>
                </div>
                
                <div class="comment-content">
                    ${comment.content}
                </div>
            </div>
            <div class="comment-like">
       
            <div class="like-button">
                <a  class="toggle-like-button" data-likes="<%= comment.likes.length %>" href="/likes/toggle/?id=<%=${comment._id}%>&type=Comment"> <i class="far fa-thumbs-up"></i>&nbsp;&nbsp; <%= comment.likes.length %> Like</a></div>
            </div>
            
        </li>`);}else{
            return $(`<li id="comment-${comment._id}">
            <div class="comment-user-profile-pic">
                <img src="/images/default-avatar.jpg">
            </div>
            <div class="comment-card">
                <div class="comment-user-name">
                    <div>
                    <a href="/users/profile/${comment.user.id}">${comment.user.name}</a></div>
                    <a href="/comments/destroy/${comment._id}" class="delete-comment-button"><i class="fas fa-times"></i></a>
                </div>
                
                <div class="comment-content">
                    ${comment.content}
                </div>
            </div>
            <div class="comment-like">
                <div class="like-button"><a href="/likes/toggle/?id=${comment._id}&type=Comment">Like</a></div>
                <div class="seperator"><i class="fas fa-circle"></i></div>
                <div class="like-count">0 Likes</div>
            </div>
        </li>`);
        }

        // return $(`<li id="comment-${ comment._id }">
        //                 <p>
                            
        //                     <small>
        //                         <a class="delete-comment-button " href="/comments/destroy/${comment._id}">X</a>
        //                     </small>
                            
        //                     ${comment.content}
        //                     <br>
        //                     <small>
        //                         ${comment.user.name}
        //                     </small>
        //                     <small>
                            
        //                         <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
        //                             0 Likes
        //                         </a>
                            
        //                     </small>

        //                 </p>    

        //         </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            console.log(deleteLink,"**+++");
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
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
}