# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_04_180909) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "makers", force: :cascade do |t|
    t.string "maker_type"
    t.integer "click_rate"
    t.integer "cost"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_makers", force: :cascade do |t|
    t.integer "number_owned"
    t.bigint "user_id", null: false
    t.bigint "maker_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["maker_id"], name: "index_user_makers_on_maker_id"
    t.index ["user_id"], name: "index_user_makers_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.integer "matchas"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "lifeTimeMatchas"
    t.float "mps"
    t.integer "cursors"
    t.integer "baberistas"
  end

  add_foreign_key "user_makers", "makers"
  add_foreign_key "user_makers", "users"
end
