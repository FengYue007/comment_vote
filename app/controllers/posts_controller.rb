class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :update, :destroy, :upvote, :downvote]
  before_action :authenticate_user!, except: [:index, :show, :vote]
 
  def index
    @post = Post.all
  end

  def upvote
    if current_user.voted_up_on? @post
      @post.liked_by current_user
    else
      @post.unlike_by current_user
    end
    render "vote.js.erb"
  end

  def downvote
    if current_user.voted_down_on? @post
      @post.like_by current_user
    else
      @post.unlike_by current_user
    end
    render "vote.js.erb"
  end

  def show 

  end

  def new
    @post = current_user.posts.build
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      redirect_to posts_path(@post),notice: "新增留言成功!"
    else
      render 'new'
    end
  end

  def edit
  end

  def update

  end
  
  def destroy
    @post.destroy
    redirect_to posts_path
  end
  


  private
  def post_params
    params.require(:post).permit(:title, :content)
  end

  def find_post
    @post = Post.find(params[:id])
  end
end