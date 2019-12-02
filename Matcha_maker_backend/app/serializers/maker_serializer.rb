class MakerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :maker_type, :click_rate, :cost
end
