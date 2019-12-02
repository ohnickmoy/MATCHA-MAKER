class Api::V1::MakersController < ApplicationController
    def index
        makers = Maker.all
        render json: MakerSerializer.new(makers)
    end
end
