<template>
    <div class="container">
        <div class="topMovie flex flex-wrap pe-7 gap-7">
            <div class="basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/6">
                <img :src="movieList[0].poster_path !== null ? movieList[0].poster_path : null" alt="" class="w-full h-auto">
            </div>
            <div class="det shrink ">
                <p class="text-xs mb-7">
                    {{ movieList[0].vote_average }}
                    <span class="ms-1.5">
                        ( {{ movieList[0].vote_count }} )
                    </span>
                </p>
                <h6 class="title capitalize text-wrap text-ellipsis mb-3.5 font-medium">{{ movieList[0].title }}</h6>
                <p class="year-rel text-sm italic mb-7 font-light">
                    {{ movieList[0].release_date ? movieList[0].release_date : 'coming soon' }}
                </p>
                <p class="desc text-wrap text-ellipsis mb-7">{{ movieList[0].overview }}</p>
            </div>
        </div>
        <hr />
        <div class="others h-fit">
            <p class="text-sm tracking-wider mt-7">others</p>
            <div class="flex flex-wrap gap-7 h-fit max-h-fit">
                <div v-for="(i, index) in movieList.slice(1)" class=" basis-2/5 md:basis-2/6 lg:basis-2/12">
                    <div v-if="index < stopPoint">
                        <MovieCard :src="i.poster_path">
                            <template v-slot:title>{{ i.title }}</template>
                            <template v-slot:release-date>{{  i.release_date !== null ? i.release_date : 'coming soon' }}</template>
                            <template v-slot:ratings>{{ i.vote_average }}</template>
                            <template v-slot:no-vote>{{ i.vote_count }}</template>
                        </MovieCard>
                    </div>
                </div>
            </div>
        </div>
        <button class='bg-none p-3.5 border-none' @click="seemoreBtn">{{ seeBtn }}</button>
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
            stopPoint:null,
            rem:null,
            seeBtn:'see more'
        }
    },
    computed:{
        movieList(){
           return this.$route.query.data ? JSON.parse(this.$route.query.data)
            : null;
        }
    },
    mounted(){
        this.stopPoint = this.movieList.length > 8 ? 8 : this.movieList.length;
        this.rem = this.movieList.length - this.stopPoint;
    },
    methods:{
        seemoreBtn(){
            let frac = this.rem / 2;

            if(this.seeBtn === 'see more'){

                this.stopPoint = frac >= 2 ? this.stopPoint + 4 
                : this.stopPoint + this.rem;

                this.seeBtn = this.rem >= 1 ?  'see more' : 'see less';

            }else{
                this.stopPoint = this.movieList.length > 8 ? 8 : this.movieList.length;
                this.seeBtn = 'see more';
            }
        }
    }
}
</script>