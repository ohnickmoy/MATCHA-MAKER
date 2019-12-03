class Api::V1::UsersController < ApplicationController
    def index
        users = User.all
        render json: UserSerializer.new(users)
    end

    def show
        user = User.find(params[:id])
        render json: UserSerializer.new(user)
    end

    def update
        user = User.find(params[:id])
        user.update(matchas: params[:matchas])
        render json: UserSerializer.new(user)
    end
end
