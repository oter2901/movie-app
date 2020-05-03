# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

role_types = [
   "ACTOR",
   "DIRECTOR",
   "PRODUCER",
]

role_types.each do |type|
  RoleType.create( type_name: type)
end