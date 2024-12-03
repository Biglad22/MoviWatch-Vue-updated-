<template>
    <div class="container flex flex-col flex-wrap gap-6 sm:gap-10 md:gap-12 xl:gap-16">
        <div class="flex flex-wrap items-center justify-between">
            <h6 class="px-3.5 py-0 border-l-4 border-l-secondary">Search</h6>
            <div class="filter w-fit h-fit relative">
                <button type="button" class="py-2 px-7 border-2 box-border hover:border-[var(--text-l)]" @click="openFilter" :class="isVisible ===false ? 'border-transparent' : null ">
                    filter
                </button>
                <Transition name="filter-menu">
                    <div class="w-[33.33vw] sm:w-[25vw] md:w-[20vw] lg:w-[16.6vw]  absolute right-0 top-[120%] p-7 bg-green-700" v-show="isVisible">
                        <form action="" class=" flex flex-wrap flex-col gap-7 w-full">
                            <label for="genre" class="flex flex-wrap flex-col gap-3.5">
                                genre
                                <select name="genre" id="genre-filter" class=" bg-transparent border-2 focus:outline-none p-3.5 box-border h-fit flex flex-wrap items-center" v-model="filterGenre">
                                    <option value="0" selected class="text-[var(--text-h)] bg-[var(--op-bg-m)">- default -</option>
                                    <option v-for="i in movieGenre" :value="i.id" class="text-[var(--text-h)] bg-[var(--op-bg-m)]" :key="i.name" >{{ i.name }}</option>
                                </select>
                            </label>
                            <label for="realse-date" class="flex flex-wrap flex-col gap-3.5 w-full">
                                release date
                                <input type="range" name="release-date" min="1990" step="1"  :max='newest' class="max-w-full h-1" id="release-date" v-model="filterDate">
                            </label>
                            <label for="ratings" class="flex flex-wrap flex-col w-full">
                                minimum rating
                                <div class="flex flex-wrap gap-2 items-center w-full">
                                    <input type="range" name="ratings" min="0" :max="mostPor" step="1" id="ratings" class=" h-[1.6rem] flex-1 bg-primary " v-model="filterRating">
                                    <p class="py-3.5 w-[var(--text-wrap)]">{{ filterRating }}</p>
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
        <div class="flex flex-wrap gap-7" v-if="movieList.length > 0 || filterList.length > 0 ">
            <MovieCard v-for="mov in filtered ? filterList  : movieList" :movie="mov" />
        </div>
        <h5 class="text-center text-[var(--text-l)] mt-[15%] capitalize" v-else>No result</h5>
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
                filterDate:null,
                filterList:[],
                filtered:false,
                movieGenre:null,
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
                console.log(this.movieList)
                let theObj = this.movieList.length > 0 ? this.latest(this.movieList, 'release_date') : null;
                theObj = theObj !== null ? theObj.release_date.split('-') : null;
                
                return this.filterDate = theObj !== null ? Number(theObj[0]) : null;
            },
            mostPor(){
                let theObj = this.movieList.length > 0 ? this.latest(this.movieList, 'vote_average') : null;
                theObj = theObj !== null ? theObj.release_date.split('-') : null;
                
                return this.filterRating = theObj !== null ? Number(theObj[0]) : 10;
            }
        },
        methods:{
            async openFilter(){
                try{
                    // const options = {
                    //   method: 'GET',
                    //   headers: {
                    //     accept: 'application/json',
                    //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTMxN2IwM2I3MmVmMjVkYWQwMjgzNmMyNDQwY2M5MyIsInN1YiI6IjY0NjQ1ZjdkZjQ4YjM0MDBlM2MwM2QyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sqqO92I_wuG0v1h8uh_fGnJtDB9Wx5EgWmMiNbo5PaA'
                    //   }
                    // };

                    // const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
                    // let data = await response.json();
                    // this.movieGenre = await data.genres;

                    //opens filter tray
                    this.isVisible = !this.isVisible;
                }catch(err){
                    console.error(err);
                }
            },
            filter(){


                // filtered is true when user applies filter
                this.filtered = true;

                for (let i in this.movieList){ 

                    let year = this.movieList[i].release_date.split('-');
                    year = Number(year[0]);

                    //conditions for filtering
                    let itGenre = this.movieList[i].genre_ids


                    if (this.filterGenre == 0 || itGenre.includes(this.filterGenre)){
                        if(year === Number(this.filterDate)){
                            parseFloat(this.movieList[i].vote_average) === parseFloat(this.filterRating) ? this.filterList.push(this.movieList[i]) : null
                        }
                    }

                }
                
                
                this.isVisible = false;
            },
            latest(list, criteria){
            
                const op = list.reduce(
                    (a,b)=>{

                        let ini = typeof a[criteria] !== 'number' ? a[criteria].split('-') : a[criteria];
                        ini = typeof ini === 'object' ? Number(ini[0]) : Number(ini);

                        let fin = typeof b[criteria] !== 'number' ? b[criteria].split('-') : b[criteria];
                        fin =  typeof fin === 'object' ? Number(fin[0]) : Number(fin);

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

 input[type='range']{
    -webkit-appearance: none;
    appearance: none;
    outline:none;
    opacity:0.7;
    -webkit-transition: 0.2s;
    transition: 0.2s;
 }

 input[type='range']:hover{
    opacity:1;
 }

 input[type='range']::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    width:1.6rem;
    height: 1.6rem;
    cursor: pointer;
 }

 
 input[type='range']::-moz-range-thumb{
    width:1.6rem;
    height: 1.6rem;
    cursor: pointer;
 }
</style>