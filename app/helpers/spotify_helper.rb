module SpotifyHelper
    def user_info
        authorised_client = OAuth2::AccessToken.from_hash(oauth2_client,:refresh_token => session[:refresh_token]).refresh!
        data = authorised_client.get('https://api.spotify.com/v1/me/')
        @user = JSON.parse(data.response.body)
    end
    def albums
        authorised_client = OAuth2::AccessToken.from_hash(oauth2_client,:refresh_token => session[:refresh_token]).refresh!
        data = authorised_client.get('https://api.spotify.com/v1/me/albums')
        @data = JSON.parse(data.response.body)
        @albums = parse_albums(@data["items"])
    end
    def playlists
    end

    def parse_albums(array)
        @data["items"].map do |album| {
          artist: album["album"]["artists"][0]["name"],
          album_name: album["album"]["name"],
          image: album["album"]["images"][0]["url"],
          tracks: parse_songs(album["album"]["tracks"]['items'])
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
