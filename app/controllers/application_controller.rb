class ApplicationController < ActionController::Base
  protected

  def ensure_access_token
    unless session[:access_token]
      scopes = URI.escape('user-library-read')
      redirect_to oauth2_client.auth_code.authorize_url(:redirect_uri => 'http://localhost:3000/login/oauth2_callback', :scope => scopes)
    end
  end

  def oauth2_client
    scopes = URI.escape('scope=user-read-private user-library-read user-read-email')
    puts scopes
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


  def parse_albums(array)
    @data["items"].map do |album| {
      artist: album["album"]["artists"][0]["name"],
      album_name: album["album"]["name"],
      image: album["album"]["images"][0]["url"],
      tracks: songs_hash(album["album"]["tracks"]['items'])
      }.to_h
    end
  end


  def parse_songs(array)
    array.map do |track|{
      track: track["name"],
      duration: track["duration_ms"],
      track_no: track["track_number"]
      }
    end
  end

end
