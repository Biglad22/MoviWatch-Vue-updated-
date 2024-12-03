import axios from "axios";

const api = axios.create({
  method: 'GET',
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Accept' : 'application/json',
    'Authorization' :`Bearer ${import.meta.env.VITE_API_KEY}`
  }
});

const generalParams = {
  include_adult: false,
  include_video: false,
  language: 'en-US',
  sort_by: 'popularity.desc',
  page:'1'
}




///this makes api call to gets all movie information
export const getTrending = async (pageNo='1') =>{

  const page = `${pageNo}`;

  try{
    const response = await  api.request({
      method : 'GET',
      url:'/trending/movie/day',
      params:{page}
    });
    
    const data = await response.data.results;
    return data;
  }
  catch(err){ throw err}
}


// makes api call using genreId and pageNo
// pageNo is optional and has a default value of one, to get movie list at page one
export const getMoviesByGenre = async(genreId, pageNo='1' ) =>{
  
  try {
    const response = await api.request({
      method: 'GET',
      url:'/discover/movie', 
      params:{...generalParams, page: pageNo, with_genres: genreId}
    });

    const data = await response.data.results;    
    return data;

  } catch (error) {throw error}
}

///api call to find the movie with the give name
export const findMovie = async (query) =>{
  try{
    //finds movies that has query in its name
    const res =  await api.request('/search/movie',{...generalParams, query});
    const data = await res.data.results; 

    ///TODO hookup api call
    
    return data;

  }catch(err){throw err};
  
}