Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  resources :users
  resources :tests

  resources :posts,shallow: true do
    member do
      patch "upvote", to: "posts#upvote"
      patch "downvote", to: "posts#downvote"
    end
    resources :comments
  end

  resources :quests 
  resource :profile
  
  get "/jsons/data", to: "jsons#data"
  get "/jsons/posts_comments/:id", to: "jsons#posts_comments"
  get "/quests/questdata", to: "quests#questdata"

  # API 路徑設定
  namespace :api do
    namespace :v1 do
      resources :quests, except: [:new, :edit] do
        resources :prompts, only: [:index, :show]
      end

      resources :posts, except: [:new, :edit] do
        resources :comments, except: [:new, :edit]
      end
      
    end
  end


  root to: "users#index" #devise 用，之後有必要再換名稱

end
