require 'rails_helper'

RSpec.describe ProfileController, type: :controller do
    describe "GET #index" do
        it "redirects if you do not have a valid session" do
            get :index, params: {}
            expect(response).to redirect_to landing_index_path
        end
    end
end
