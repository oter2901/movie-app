class MovieSerializer < ActiveModel::Serializer
  # TODO: Return Roman release_year
  attributes :id, :title, :release_year, :casting, :directors, :producers
  def casting
    Role.where(movie_id: object.id, role_type_id: 1).select('person_id').map do |role|
      role.person_id
    end
  end
  def directors
    Role.where(movie_id: object.id, role_type_id: 2).select('person_id').map do |role|
      role.person_id
    end
  end
  def producers
    Role.where(movie_id: object.id, role_type_id: 3).select('person_id').map do |role|
      role.person_id
    end
  end
end
