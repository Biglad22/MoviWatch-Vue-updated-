<template>
    <div class="container">
        <div class="topMovie flex flex-wrap p-7 space-x-7">
            <img src="" alt="" class=" w-auto h-auto basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/6 border">
            <div class="det grow">
                <p class="text-xs mb-7">
                    ratings tag
                    <span>
                    </span>
                </p>
                <h6 class="title capitalize text-wrap text-ellipsis mb-3.5 font-medium">movie title</h6>
                <p class="year-rel text-sm italic mb-7 font-light">
                    released year
                </p>
                <p class="desc text-wrap text-ellipsis mb-7">movie description</p>
            </div>
        </div>
        <hr />
        <div class="others">
            <p class="text-sm tracking-wider mt-7">others</p>
            <div class="flex space-x-7 space-y-7">
                <MovieCard class="shrink grow" ></MovieCard>
            </div>
        </div>
        <button class='bg-none p-3.5 border-none'>see more</button>
    </div>
</template>
<script>
import MovieCard from '../components/movieCard.vue';

export default {
    components:{
        MovieCard
    },
    data(){
        return{
            movieList:null
        }
    },
    beforeMount(){
        this.movieList = this.$route.query.data ? JSON.parse(this.$route.query.data)
        : null
    }
}
</script>