class UserMakerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :number_owned, :user_id, :maker_id
end
