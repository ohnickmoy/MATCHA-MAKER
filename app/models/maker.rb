class Maker < ApplicationRecord
    has_many :user_makers
    has_many :users, through: :user_makers
end
