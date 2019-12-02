class CreateMakers < ActiveRecord::Migration[6.0]
  def change
    create_table :makers do |t|
      t.string :maker_type
      t.integer :click_rate
      t.integer :cost

      t.timestamps
    end
  end
end
