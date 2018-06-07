require 'rails_helper'

RSpec.describe SessionController, type: :controller do
    describe "GET #index" do
        # it "it calls ensure_access_token" do
        #     get :index, params: {}
        #     expect_any_instance_of(LoginController).to receive(:ensure_access_token)
        # end
        it "it sends a request to Spotify" do
            get :index, params: {}
            expect(response).to redirect_to %r(\Ahttps://accounts.spotify.com)
        end
    end
end