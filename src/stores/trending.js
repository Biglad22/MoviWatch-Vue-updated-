import { getTrending } from "@/services";
import { refineMovieList } from "@/util/refineMovieData";
import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useTrendStore = defineStore('trendStore', ()=>{

    const trendingMovies = ref([]);


    /// this function makes an api call to get the top trending movies and the popular movies in the market right now
    function getTrendingMovies() {
        try{
            getTrending()
            .then(res => {
                const {available} = refineMovieList(res)
                trendingMovies.value = available;
            });

        }catch(err){throw err}
    }

    /// getter
    const headLineMovies = i => computed(()=>{
        if (trendingMovies.value.length < 1) return [];

        const filter = trendingMovies.value.filter(mov => mov.vote_average > 8 );
        
        return{length: filter.length, current: filter[i]};
    })

    return {trendingMovies, headLineMovies, getTrendingMovies};
})