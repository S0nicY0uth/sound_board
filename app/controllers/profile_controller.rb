class ProfileController < ApplicationController
    def index
        unless session[:access_token]
            redirect_to landing_index_path
        end
    end

end
