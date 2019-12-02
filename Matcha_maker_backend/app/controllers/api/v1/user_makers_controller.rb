class Api::V1::UserMakersController < ApplicationController
    def index
        user_makers = UserMaker.all
        render json: UserMakerSerializer.new(user_makers)
    end
end
