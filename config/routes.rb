Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :session, :only => :index do
    collection do
      get :oauth2_callback
      get :get_data
      delete :destroy
    end
  end

  resources :profile, :only => :index

  resources :spotify

  resources :landing, :only => :index

  root 'landing#index'

end
