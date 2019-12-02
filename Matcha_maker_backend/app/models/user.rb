class User < ApplicationRecord
    has_many :user_makers
    has_many :makers, through: :user_makers
end
