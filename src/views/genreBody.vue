<template>
    <!-- loading wall -->
    <LoadingWall 
        v-if="loadingState.loading || available.length < 1"   
        :loading-err="loadingState.err"
    />

    <!-- main content -->
    <div v-else class="container flex flex-col flex-wrap gap-14">
        <HeadlineMovie />
        <div class="others h-fit">
            <SectionTitle title="others" />
            <div class="flex flex-wrap gap-7 h-fit max-h-fit justify-between">
                <div v-for="(mov, index) in available" :key="index" >
                    <Transition name="movCard">
                        <MovieCard  :movie="mov" class=" basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5" />
                    </Transition>
                </div>
            </div>
        </div>
        <button class='bg-none ps-0 p-3.5 border-none w-fit' @click="seeMore">see More</button>
    </div>
</template>
<script setup>
    import LoadingWall from '@/components/loading.vue';
    import MovieCard from '@/components/movieCard.vue';
    import SectionTitle from '@/components/sectionTitle.vue';
    import { useGenre } from '@/stores/movieByGenre';
    import { computed, onMounted, ref, watch } from 'vue';
    import { movieGenreCode } from '@/util/navigationHelper';
    import HeadlineMovie from '@/components/headlineMovie.vue';
    import { useRoute } from 'vue-router';


    /// variable used to determine wether loading wall should be removed or there has been an error
    const loadingState = ref({
        loading : true,
        err: false
    })

    //access genre store 
    const currentGenre = useGenre();

    /// remember that an api call was made at the click of genre router link button
    /// available is an array of movies with a release data 
    const available = computed(()=> currentGenre.available);

    ///access route 
    const route = useRoute()



    ///handles actual information fetch
    const fetchGenreData = (genre) => {
        
        try{    
            const genreId = movieGenreCode[genre.toLowerCase()];  // finds genre code from the object of genre codes in movieGenreCode
            currentGenre.changeGenre(genreId);  // api call for regular movie genre

            loadingState.value = { // if call is successful LoadingWall is removed with error message if rendered
                loading : false,
                err: false
            };
        }catch (error) {

            loadingState.value = { // if call is unsuccessful LoadingWall remains with an error message
                loading : true,
                err: true
            };
            console.log(error);
        };
    }
    onMounted(()=>{
        const initialGenre = route.params.genre;
        fetchGenreData(initialGenre)
    })
    
    // Watch for route changes
    watch(() => route.params.genre, (newGenre) => {
        if (newGenre) fetchGenreData(newGenre);
    });
    
    const seeMore = () => currentGenre.changePage();

</script>
<style scoped>
.movCard-enter-active, .movCard-leave-active{
    transition: all 500ms;
    opacity:1;
}
.movCard-enter-from, .movCard-leave-to{
    opacity:0;
}
</style>