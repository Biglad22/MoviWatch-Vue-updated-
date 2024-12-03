import { getMoviesByGenre } from "@/services";
import { refineMovieList } from "@/util/refineMovieData";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGenre = defineStore('genre',()=>{
    
    //stores the current genre id
    const curGenre = ref(0);

    // movie list based on availability (release date)
    const comingSoon = ref([]);
    const available = ref([]);

    //stores current page 
    const curPage = ref(1);

    /// this is the initial call for movie list and page 1
    function changeGenre(genreId) {
        try {
            ///API CALL FOR MOVIE LIST BASED ON GENRE ID
            getMoviesByGenre(genreId)
            .then(res =>{ 
                const refineList = refineMovieList(res, curPage.value);
                
                comingSoon.value = refineList.comingSoon;
                available.value = refineList.available;
                curGenre.value = genreId;
            })
            .catch(err =>{ throw err });

        } catch (error) { throw error };

    };

    ////this function adds to the list of movies
    function changePage(){
        try {

            curPage.value++;
            ///API CALL FOR MOVIE LIST BASED ON GENRE ID            
            getMoviesByGenre(curGenre.value, curPage.value)
            .then(res =>{ 
                const refineList = refineMovieList(res);

                comingSoon.value.push(...refineList.comingSoon);
                available.value.push(...refineList.available);
            })
            .catch(err =>{ throw err });
            
        } catch (error) {
            
        }
    }


    return {available, comingSoon, curPage, changeGenre, changePage};

});