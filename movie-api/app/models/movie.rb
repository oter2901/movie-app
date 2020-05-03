class Movie < ApplicationRecord
    attr_accessor :directors, :producers, :casting
    has_many :roles, dependent: :destroy
    after_create :create_or_update_role
    after_update :create_or_update_role

    def create_or_update_role
        puts "Creating"
        if casting
            casting.each do |role|
            Role.create(movie_id: id, person_id: role[:person_id], role_type_id: 1)
            end
        end
        if directors
            directors.each do |role|
            Role.create(movie_id: id, person_id: role[:person_id], role_type_id: 2)
            end
        end
        if producers
            producers.each do |role|
            Role.create(movie_id: id, person_id: role[:person_id], role_type_id: 3)
            end
        end
    end
end
