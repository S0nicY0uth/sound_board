Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :login, :only => :index do
    collection do
      get :oauth2_callback
    end
  end

  root 'login#index'

end
