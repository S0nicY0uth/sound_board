class SessionController < ApplicationController
    before_action :ensure_access_token, :except => :oauth2_callback
    def index         
        authorised_client = OAuth2::AccessToken.from_hash(oauth2_client,:refresh_token => session[:refresh_token]).refresh!
        redirect_to profile_index_path     
    end

    def expired?
       
    end

    
    def oauth2_callback
        # Swap Auth token for an access token
        token = oauth2_client.auth_code.get_token(params[:code],:redirect_uri => 'http://localhost:3000/session/oauth2_callback')
        # Remember the access token
      
        #token = OAuth2::AccessToken.from_hash(oauth2_client, :refresh_token => session[:refresh_token]).refresh!

        session[:access_token] = token.token
        session[:refresh_token] = token.refresh_token
        session[:expires_at] = token.expires_at
        session[:expires_in] = token.expires_in
        
    
        redirect_to session_index_path
    end

    def destroy
        session.delete(:access_token)
        session.delete(:refresh_token)
        session.delete(:expires_at)
        session.delete(:expires_in)
        
        redirect_to landing_index_path
    end

end


