class LandingController < ApplicationController
    def index
        if session[:access_token]
            redirect_to profile_index_path
        end
    end
end
