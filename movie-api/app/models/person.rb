class Person < ApplicationRecord
    attr_accessor :person_roles
    has_many :roles, dependent: :destroy
    has_many :movies
    
    after_create :create_or_update_role
    after_update :create_or_update_role
    
    protected
    def create_or_update_role
        if person_roles
            person_roles.each do |role|
            role_type_id = RoleType.find_by(type_name: role["role_type"]).id
            Role.create(person_id: id, movie_id: role[:movie_id], role_type_id: role_type_id  )
            end
        end
    end
end
