class SpotifyController < ApplicationController
    include SpotifyHelper
    def index
        @albums = albums
        @user = user_info
    end

end
