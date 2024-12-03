<!-- this page focuses on a single movie display -->

<template>
    <div
        class="max-w-full h-full overflow-y-auto overflow-x-hidden"
    >   
        <singleMoviImg :class="'mb-4'" :movie-banner="movie.backdrop_path" :movie-poster="movie.poster_path" />
        <div class="w-full flex flex-col gap-4">
            <h1 class="capitalize mb-2 text-primary font-medium">
                {{movie.title}}
            </h1>
            <div class="mb-2 w-full">
                <MoviText :body="movie.release_date" :large="true"  />
                <span class="flex justify-between w-full ">
                    <MoviText title="directed by" body="to be changed later" />
                    <MoviText title="rating" :body="movie.vote_average" />
                </span>
                
            </div>
            <MoviText title="description" :body="movie.overview" :large="true"  />
        </div>
    </div>
</template>

<script setup>
    import MoviText from '@/components/moviText.vue';
    import singleMoviImg from '@/components/singleMoviImg.vue';
    import { useSingleMovie } from '@/stores/singleMovie';
    import { computed, onMounted, onUnmounted, watch } from 'vue';      

    const movieStore = useSingleMovie();

    const movie = computed(() => movieStore.getMovie());
    
    onMounted(()=> console.log(movie.value))

    //sets movie state to null once page is being unmounted
    onUnmounted(()=> movieStore.setMovie(null));


</script>
