class LoginController < ApplicationController
    before_action :ensure_access_token, :except => :oauth2_callback

    def index
        scopes = URI.escape('user-read-private user-library-read user-read-email')
        authorised_client = OAuth2::AccessToken.new(oauth2_client, session[:access_token])
        data = authorised_client.get('https://api.spotify.com/v1/me/albums')

        @data = JSON.parse(data.response.body)
        
        @albums = parse_albums(@data["items"])
        binding.pry


    end

    # TODO: This ought to be in a AuthorisationController or somesuch...
    #
    def oauth2_callback
        # Swap Auth token for an access token
        token = oauth2_client.auth_code.get_token(params[:code],:redirect_uri => 'http://localhost:3000/login/oauth2_callback')
        # Remember the access token
        session[:access_token] = token.token
        redirect_to login_index_path
    end

end


