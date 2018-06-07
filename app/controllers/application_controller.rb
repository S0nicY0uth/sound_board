class ApplicationController < ActionController::Base 
  protected

  def ensure_access_token
    unless session[:access_token]
      scopes = URI.escape('user-library-read')
      redirect_to oauth2_client.auth_code.authorize_url(:redirect_uri => 'http://localhost:3000/session/oauth2_callback', :scope => scopes)
    end
  end

  def oauth2_client
    OAuth2::Client.new(
      "e5c53d800da84a60b6a5fd8a7e8b8b0e",
      "da658356efb348ab92f6379c03dc37ab",
      {
      :authorize_url => '/authorize',
      :token_url => '/api/token',
      :site => 'https://accounts.spotify.com/',
      }
    )
  end


end
