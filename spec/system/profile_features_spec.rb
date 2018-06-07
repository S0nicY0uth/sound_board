require "rails_helper"

RSpec.describe "Messaging system", :type => :feature do

    before :each do    
    end

    def login(user)
        visit '/'
        click_link('Login')
        fill_in 'user[email]', with: user.email
        fill_in 'user[password]', with: 'pass123'    
        click_button('Log in')
        expect(page).to have_text 'Please choose a chat room from the left hand side'
    end

    describe 'viewing messages' do
        it 'should allow me to view the messages associated with a specific room' do
            visit '/'
           expect(page).to have_text 'Sup Fool'
        end
    end

end