import { movieGenreCode } from "@/util/navigationHelper";

// gets all the genres acceptable as genre param in /:genre
// since genres are used as keys in movieGenreCode object the next line is necessary 
const acceptedGenre = Object.keys(movieGenreCode);

// guard function to check if passed :genre is acceptable
export const genrePathGuard = (to, from, next) => {

    let param = to.params.genre.toLowerCase();
    

    if(acceptedGenre.includes(param)) return next(); //if param is acceptable user is allowed to proceed
    else return next({path: `/404`}) // if param is not acceptable user is redirect to 404 error page
}

export const singleMoviePathGuard = (to, from, next) => {
    
    const genre = to.params.genre.toLowerCase();
    if(acceptedGenre.includes(genre) || genre === 'trending') return next(); //checks if genre is a valid genre and continues to page 
    else return next({path: `/404`}); //else navigate to the 404 page
}