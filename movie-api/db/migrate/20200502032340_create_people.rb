class CreatePeople < ActiveRecord::Migration[6.0]
  def change
    create_table :people, id: :uuid do |t|
      t.string :last_name, null: false
      t.string :first_name, null: false
      t.string :alias, null: true
      t.timestamps
    end
  end
end
