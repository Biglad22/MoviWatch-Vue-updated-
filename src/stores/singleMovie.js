import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

//stores data for selected movie
export const useSingleMovie = defineStore('singleMovieStore', ()=>{

    const movie = ref(null); //stores move data

    //sets movie data
    const setMovie = (movieData) => movie.value = movieData;

    //get movie data
    //movie is not null it returns movie
    //else it makes an api call to find the entered movie
    const getMovie = () =>{

        if(movie.value) return movie.value;

        try {

            //gets route params and checks if a movie title has been passed
            // if no movie title has been passed the return null
            let routeParams = useRouter().currentRoute.value.params
            if(!('movieTitle' in routeParams)) return;

            let movieTitle = ( routeParams.movieTitle.split('-') ).join(' ');
            return movieTitle;

        } catch (err) {throw err};
        

    }

    return {movie, setMovie, getMovie};
})