Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :makers
    end
  end
  namespace :api do
    namespace :v1 do
      resources :user_makers
    end
  end
  namespace :api do
    namespace :v1 do
      resources :users
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
