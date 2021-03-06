class Api::V1::PostsController < ApiController
  before_action :find_post, only: [:show, :update, :destroy]
  before_action :signed_in?, except: [:index, :show]

  # 【GET】 查詢文章列表  /api/v1/posts
  def index
    @posts = Post.all.order("created_at DESC")

    json_response(@posts)
  end

  # 【POST】 新增文章  /api/v1/posts
  # body: { title: '標題', content: '內容' }
  def create
    @post = current_user.posts.create!(post_params)
    json_response(@post, :created)
  end

  # 【GET】 查詢指定文章  /api/v1/posts/:id
  def show
    json_response(@post)
  end

  # 【PUT】 編輯指定文章  /api/v1/posts/:id
  # body: { title: '標題', content: '內容' }
  def update
    @post.update(post_params)
    head :no_content
  end

  # 【DELETE】 刪除指定文章  /api/v1/posts/:id
  def destroy
    @post.destroy
    head :no_content
  end

  private
  def post_params
    params.require(:post).permit(:title, :content)
  end

  def find_post
    @post = current_user.posts.find(params[:id])
  end

end