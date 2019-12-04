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
        user.update(matcha_params)
        render json: UserSerializer.new(user)
    end

    private 

    def matcha_params
        params.require(:user).permit(:matchas, :lifeTimeMatchas, :mps)
    end
end
