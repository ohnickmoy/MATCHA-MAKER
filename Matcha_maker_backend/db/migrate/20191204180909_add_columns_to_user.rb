class AddColumnsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :cursors, :integer
    add_column :users, :baberistas, :integer
  end
end
