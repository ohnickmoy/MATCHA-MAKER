class AddColumnsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :lifeTimeMatchas, :integer
    add_column :users, :mps, :float
  end
end
