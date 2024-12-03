<template>
    <RouterLink :to="singleMoviePath" @click="setSingleMovie"  class="container max-w-[var(--w)] min-w-[var(--w)] flex flex-col relative">
        <img 
            :src="movie.poster_path" 
            :alt="`${movie.title} poster`" 
            :title="`${movie.title} poster`" 
            class="card-img max-w-full h-[var(--h)]"
        />

        <div class="details px-0 py-3.5">
            <small class="ratings sm:text-base md:text-lg  xl:text-xl ">
                <span class="text-[var(--text-m)]">
                    {{ movie.vote_average }}
                </span>
                <span class=" ms-1.5 text-[var(--text-l)]">
                    ( {{ movie.vote_count }} )
                </span>
            </small>
            <p class="font-semibold text-[var(--text-h)]  whitespace-nowrap overflow-hidden text-nowrap text-ellipsis h-[var(--text-wrap)] max-h-[var(--text-wrap)]">
                {{ movie.title }}
            </p>
            <small  class="capitalize">release date:
                <span class="text-[var(--text-m)]">
                    {{ movie.release_date }}
                </span>
            </small>
        </div>
    </RouterLink>
</template>
<script setup>
    import { defineProps, onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSingleMovie } from '@/stores/singleMovie';

    /// takes movie object that contains all it's information
    const {movie} = defineProps({
        movie: {
            type : Object,
            required: true
        }
    });
    // defines the path to movie's singleMoviePage
    const singleMoviePath = ref('/');

    ///access single movie store
    const singleMovieStore = useSingleMovie();
    ///sets information of movie in single move page store on click
    const setSingleMovie = () => singleMovieStore.setMovie(movie); 

    onMounted(() => {
        ///access route params
        const {params} = useRouter().currentRoute.value;    

        /// sets the singleMove page route accordingly
        const formattedTitle = movie.title.split(' ').join('-');
        singleMoviePath.value = 'genre' in params
            ? `/${params.genre}/${formattedTitle}`
            : `/trending/${formattedTitle}`;
    });


    
</script>
<style>
:root{
 --w : calc(8 * var(--gap));
 --h : calc(1.5 * var(--w));
}
</style>
