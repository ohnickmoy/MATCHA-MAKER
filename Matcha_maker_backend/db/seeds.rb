# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Flush out all tables"
User.delete_all
# Maker.delete_all
# UserMaker.destroy

user_a = User.create(name: "Nick", matchas: 0, lifeTimeMatchas: 105, mps: 0.4, cursors: 2, baberistas: 0)


puts "Created seeds"