<template>
    <div class="container">
        <h3 class="p-7">Search Result</h3>
        <div class="flex flex-wrap gap-7" v-if="movieList.length > 0">
            <MovieCard v-for="mov in movieList" :src="mov.poster_path" class=" basis-full sm:basis-2/5 md:basis-2/6 lg:basis-2/12">
                <template v-slot:title>{{ mov.title }}</template>
                <template v-slot:release-date>{{  mov.release_date !== null ? mov.release_date : 'coming soon' }}</template>
                <template v-slot:no-vote>{{ mov.vote_count }}</template>
                <template v-slot:ratings>{{ mov.vote_average }}</template>
            </MovieCard>
        </div>
        <h3 class="text-center" v-else>Search Not Found</h3>
    </div>
</template>
<script>
    import MovieCard from '@/components/movieCard.vue';

    export default {
        components:{
            MovieCard
        },
        computed:{
            movieList(){
               return this.$route.query.data ? JSON.parse(this.$route.query.data)
                : null;
            }
        },
    }
</script>