class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies, id: :uuid do |t|
      t.string :title, null: false
      t.integer :release_year, null: false
      t.timestamps
    end
  end
end
