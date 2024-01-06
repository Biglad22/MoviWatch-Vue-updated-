<template>
    <div class="container flex flex-col flex-wrap gap-6 sm:gap-10 md:gap-12 xl:gap-16">
        <div class="flex flex-wrap items-center justify-between">
            <h3 class="p-6">Search Result</h3>
            <div class="filter w-fit h-fit relative">
                <button type="button" class="py-3.5 px-7 border-2 box-border" @click="isVisible = !isVisible" :class="isVisible ===false ? 'border-transparent' : null ">
                    filter
                </button>
                <Transition name="filter-menu">
                    <div class="w-[33.33vw] sm:w-[25vw] md:w-[20vw] lg:w-[16.6vw]  absolute right-0 top-[120%] p-7 bg-green-700" v-show="isVisible">
                        <form action="" class=" flex flex-wrap flex-col gap-7 w-full">
                            <label for="genre" class="flex flex-wrap flex-col gap-3.5">
                                genre
                                <select name="genre" id="genre-filter" class=" bg-transparent border-2 focus:outline-none p-3.5 box-border h-fit flex flex-wrap items-center" v-model="filterGenre">
                                    <option value="0" selected class="bg-black">- default -</option>
                                    <option value="1">action</option>
                                    <option value="2">adventure</option>
                                    <option value="3">biography</option>
                                    <option value="4">comedy</option>
                                    <option value="5">drama</option>
                                    <option value="6">documentary</option>
                                </select>
                            </label>
                            <label for="realse-date" class="flex flex-wrap flex-col gap-3.5 w-full">
                                release date
                                <input type="range" name="release-date" min="1990" step="1"  :max='newest' class="max-w-full h-1" id="release-date" v-model="filterDate">
                            </label>
                            <label for="ratings" class="flex flex-wrap flex-col gap-3.5 w-full">
                                minimum rating
                                <div class="flex flex-wrap gap-2 items-center w-full">
                                    <p>0</p>
                                    <input type="range" name="ratings" min="0" max="10" step="1" id="ratings" class=" h-1 max-w-full flex-1" v-model="filterRating">
                                    <p>10</p>
                                </div>
                            </label>
                            <div class="buttons flex flex-wrap gap-3.5 w-full">
                                <button type="reset" class=" box-border p-3.5 bg-transparent border-2">reset</button>
                                <button type="button" @click="filter" class="p-3.5 box-border border-2 border-transparent flex-1 bg-black">apply</button>
                            </div>
                        </form>
                    </div>
                </Transition>
            </div>
        </div>
        <div class="flex flex-wrap gap-7" v-if="movieList.length > 0">
            <MovieCard v-for="mov in filtered ? filterList  : movieList" :src="mov.poster_path" class=" basis-full sm:basis-2/5 md:basis-2/6 lg:basis-2/12">
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
    import { Transition } from 'vue';

    export default {
        data(){
            return{
                isVisible:false,
                //filter data
                filterGenre:null,
                filterRating:null,
                filterDate:this.newest,
                filterList:[],
                filtered:false
            }
        },
        components:{
            MovieCard
        },
        computed:{
            movieList(){
               return this.$route.query.data ? JSON.parse(this.$route.query.data)
                : null;
            },
            newest(){
                let theObj = this.latest(this.movieList);
                theObj = theObj.release_date.split('-');
                
                return Number(theObj[0]);
            }
        },
        methods:{
            filter(){


                // filtered is true when user applies filter
                this.filtered = true;
                console.log(this.filterDate)

                for (let i in this.movieList){ 

                    let year = this.movieList[i].release_date.split('-');
                    year = Number(year[0]);

                    //conditions for filtering
                    let itGenre = this.movieList[i].genre_ids
                    if (itGenre.includes(this.filterGenre)){
                        if(year === Number(this.filterDate)){
                            Number(this.movieList[i].vote_average) === Number(this.filterRating) ? this.filterList.push(this.movieList[i]) : null
                        }
                    }

                }
                
                
                this.isVisible = false;
            },
            latest(list){
            
                const op = list.reduce(
                    (a,b)=>{

                        let ini = a.release_date.split('-');
                        ini = Number(ini[0]);

                        let fin = b.release_date.split('-');
                        fin = Number(fin[0]);

                        return ini > fin ? a : b;
                    }, list[0]
                );

                return op;
            }
        }
    }
</script>
<style scoped>
::-webkit-scrollbar, ::-webkit-scrollbar-track{
    display: none !important;
}
 .filter-menu-enter-active, .filter-menu-leave-active{
    transition:all 0.5s;
    opacity:1;
 }
 .filter-menu-enter-from, .filter-menu-leave-to{
    opacity: 0;
    top:100%
 }
</style>