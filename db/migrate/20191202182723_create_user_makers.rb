class CreateUserMakers < ActiveRecord::Migration[6.0]
  def change
    create_table :user_makers do |t|
      t.integer :number_owned
      t.references :user, null: false, foreign_key: true
      t.references :maker, null: false, foreign_key: true

      t.timestamps
    end
  end
end
