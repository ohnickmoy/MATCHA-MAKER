class CreateUserMakers < ActiveRecord::Migration[6.0]
  def change
    create_table :user_makers do |t|
      t.integer :number_owned
      t.integer :user_id
      t.integer :maker_id

      t.timestamps
    end
  end
end
