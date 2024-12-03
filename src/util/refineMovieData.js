
// this helps refine movie data
// it takes an array of movies to change some of their information, like release date and returns an object that contains two arrays(comingSoon, available)
export const refineMovieList = (movieList) => {
    const newResult = {};

    const movs = movieList.map(mov => ({
        ...mov,
        release_date : mov.release_date ? `${mov.release_date.split('-')[1]}-${mov.release_date.split('-')[0]}` : 'coming soon',
        poster_path : mov.poster_path !== null ? `https://image.tmdb.org/t/p/original${mov.poster_path}` : null,
        backdrop_path : mov.backdrop_path !== null ? `https://image.tmdb.org/t/p/original${mov.backdrop_path}` : null
    }))

    newResult.comingSoon =[];  
    newResult.available =[];
    
    movs.forEach(mov => {
        if (mov.release_date === 'coming soon') newResult.comingSoon.push(mov);
        else newResult.available.push(mov);
    });

    return newResult;
}



