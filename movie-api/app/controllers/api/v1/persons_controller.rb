class Api::V1::PersonsController < ApplicationController
    before_action :authenticate_user!, except: [:show, :index]
    def index
        @persons = Person.all
        render json: @persons
    end

    def show
        @person = Person.find(params[:id])
        if @person
            render json: @person, status: :ok
        else
            render error: {error: "Failed to fetch person"}, status: :not_found
        end
    end

    def create 
        @person = Person.new(person_params)
        if @person.save
            render json: @person, status: :created
        else
            render error: {error: "Failed to save person"}, status: :bad_request
        end
    end

    def destroy
        @person = Person.find(params[:id])
        if @person.destroy
            render status: :no_content
        else 
            render error: {error: "Failed to delete person" } , status: :bad_request
        end
    end

    def update
        @person = Person.find(params[:id])
        if @person.update(person_params)
            render json: @person
        else
            render error: {error: "Failed to save person"}, status: :bad_request
        end
    end

    private
    def person_params
        params.require(:person).permit(:last_name, :first_name, :alias, person_roles: [:movie_id, :role_type])
    end
end
