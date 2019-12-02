# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Flush out all tables"
User.delete_all
Maker.delete_all
UserMaker.delete_all

user_a = User.create(name: "Nick", matchas: 0)
user_b = User.create(name: "Jallen", matchas: 0)

maker_a = Maker.create(maker_type: "cursor", click_rate: 1, cost: 15)
maker_b = Maker.create(maker_type: "Ken", click_rate: 2, cost: 100)

um_a = UserMaker.create(number_owned: 2, user_id: user_a.id, maker_id: maker_a.id)
um_b = UserMaker.create(number_owned: 3, user_id: user_b.id, maker_id: maker_b.id)
um_c = UserMaker.create(number_owned: 4, user_id: user_a.id, maker_id: maker_b.id)

puts "Created seeds"