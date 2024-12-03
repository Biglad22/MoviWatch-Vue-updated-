<template>
    <div class="container flex flex-col flex-wrap gap-14">
        <div class="topMovie flex flex-wrap pe-7 gap-7">
            <div class="basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/6">
                <img :src="movieList[0].poster_path !== null && movieList[0].hasOwnProperty('poster_path') ? movieList[0].poster_path : null" alt="" class="w-full h-auto">
            </div>
            <div class="det shrink ">
                <p class="text-[calc( var(--gap) - 0.2rem)] mb-7">
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
            <h6 class=" mt-7 px-3.5 border-l-4 border-l-[var(--secondary)] capitalize mb-14">others</h6>
            <div class="flex flex-wrap gap-7 h-fit max-h-fit">
                <div v-for="(i, index) in movieList.slice(1)" :index="index" class=" basis-2/5 md:basis-2/6 lg:basis-2/12" :class="index < stopPoint ? 'block' : 'hidden' ">
                    <Transition name="movCard">
                        <MovieCard :src="i.poster_path !== null && i.hasOwnProperty('poster_path') ? i.poster_path : null"  v-show="index < stopPoint">
                            <template v-slot:title>{{ i.title }}</template>
                            <template v-slot:release-date>{{  i.release_date !== null ? i.release_date : 'coming soon' }}</template>
                            <template v-slot:ratings>{{ i.vote_average }}</template>
                            <template v-slot:no-vote>{{ i.vote_count }}</template>
                        </MovieCard>
                    </Transition>
                </div>
            </div>
        </div>
        <button class='bg-none ps-0 p-3.5 border-none w-fit' @click="seemoreBtn">{{ seeBtn }}</button>
    </div>
</template>
<script>

import MovieCard from '../components/movieCard.vue';
import { Transition } from 'vue';

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
<style scoped>
.movCard-enter-active, .movCard-leave-active{
    transition: all 0.5ms;
    opacity:1;
}
.movCard-enter-from, .movCard-leave-to{
    opacity:0;
}
</style>