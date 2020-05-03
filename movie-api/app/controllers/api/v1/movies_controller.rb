class Api::V1::MoviesController < ApplicationController
    def index
        @movies = Movie.all
        render json: @movies
    end

    def show
        @movie = Movie.find(params[:id])
        if @movie
            render json: @movie, status: :ok
        else
            render error: {error: "Failed to fetch movie"}, status: :not_found
        end
    end

    def destroy
        @movie = Movie.find(params[:id])
        if @movie.destroy
            render status: :no_content
        else 
            render error: {error: "Failed to delete movie" } , status: :bad_request
        end
    end

    def create 
        @movie = Movie.new(movie_params)
        if @movie.save
            render json: @movie
        else
            render error: {error: "Failed to save movie"}, status: 400
        end
    end

    def update
        @movie = Movie.find(params[:id])
        if @movie.update(movie_params)
            render json: @movie
        else
            render error: {error: "Failed to save person"}, status: :bad_request
        end
    end

    private
    def movie_params
        params.require(:movie).permit(:title, :release_year, directors: [:person_id], casting: [:person_id], producers: [:person_id])
    end
end
