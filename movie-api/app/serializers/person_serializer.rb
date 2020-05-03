class PersonSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :alias, :movies_as_actor, :movies_as_director, :movies_as_producer
  def movies_as_actor
    Role.where(person_id: object.id, role_type_id: 1).select('movie_id').map do |role|
      role.movie_id
    end
  end
  def movies_as_director
    Role.where(person_id: object.id, role_type_id: 2).select('movie_id').map do |role|
      role.movie_id
    end
  end
  def movies_as_producer
    Role.where(person_id: object.id, role_type_id: 3).select('movie_id').map do |role|
      role.movie_id
    end
  end
end
