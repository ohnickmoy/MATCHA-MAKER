class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :matchas, :lifeTimeMatchas, :mps, :cursors, :baberistas
end
