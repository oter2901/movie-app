class CreateRoles < ActiveRecord::Migration[6.0]
  def change
    create_table :role_types do |t|
      t.string :type_name, null: false
    end  
    create_table :roles, id: :uuid do |t|
      t.uuid :person_id, index: true, foreign_key: true
      t.uuid :movie_id, index: true, foreign_key: true
      t.references :role_type, foreign_key: true
      t.timestamps
    end
  end
end
