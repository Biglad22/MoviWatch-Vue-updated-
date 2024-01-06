<script>
import {RouterView, RouterLink} from 'vue-router';
import SideBtn from './components/sideBtn.vue';
import GenreBody from './views/genreBody.vue';
  export default {
    components: {
      SideBtn, GenreBody
    },
    data:()=>{
      return{
        allMov:[],
        actMov:[],
        comMov:[],
        advMov:[],
        animMov:[],
        famMov:[],
        horMov:[],
        lovMov:[],
        scifiMov:[],
        othMov:[],
        trenMov:[],
        movieIcons:null,
        searchInput:'',
        searchResult:[],
        loading:true,
        isVisible:false,
        isClicked:true
      }
    },
    methods:{
      async getAPI(start, end){
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTMxN2IwM2I3MmVmMjVkYWQwMjgzNmMyNDQwY2M5MyIsInN1YiI6IjY0NjQ1ZjdkZjQ4YjM0MDBlM2MwM2QyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sqqO92I_wuG0v1h8uh_fGnJtDB9Wx5EgWmMiNbo5PaA'
          }
        };

        try{


          while(start < end){
            let data = await  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${start}&sort_by=popularity.desc`, options);
            start++;
            data = await data.json();
            this.allMov = this.allMov.concat(data.results); 
          }

          console.log(this.allMov)
          //display home page after load
          this.loading = false;


          for ( let i in this.allMov){

            // this.allMov[i].release_date = this.allMov[i].release_date !== null ? this.allMov[i].release_date.split('-') : 'coming soon';
            // this.allMov[i].release_date = this.allMov[i].release_date !== 'coming soon' ? `${this.allMov[i].release_date[1]} ${this.allMov[i].release_date[0]} ` : 'coming soon' ;

            this.allMov[i].poster_path = this.allMov[i].poster_path !== null ? `https://image.tmdb.org/t/p/original${this.allMov[i].poster_path}` : null;

            this.allMov[i].genre_ids.includes(28) ? this.actMov.push(this.allMov[i]) 
            : this.allMov[i].genre_ids.includes(35) ? this.comMov.push(this.allMov[i])
            : this.allMov[i].genre_ids.includes(12) ? this.advMov.push(this.allMov[i])
            : this.allMov[i].genre_ids.includes(27) ? this.horMov.push(this.allMov[i])
            : this.allMov[i].genre_ids.includes(10749) ? this.lovMov.push(this.allMov[i])
            : this.allMov[i].genre_ids.includes(878) ? this.scifiMov.push(this.allMov[i])
            : this.allMov[i].genre_ids.includes(10751) ? this.famMov.push(this.allMov[i])
            : this.allMov[i].genre_ids.includes(16) ? this.animMov.push(this.allMov[i])
            : this.othMov.push(this.allMov[i])
          };

          //update trending array
          this.trenMov= [this.actMov[0] ? this.actMov[0] : null, 
            this.comMov[0] ? this.comMov[0] : null,  
            this.advMov[0] ? this.advMov[0] : null,  
            this.horMov[0] ? this.horMov[0] : null, 
            this.lovMov[0] ? this.lovMov[0] : null, 
            this.famMov[0] ? this.famMov[0] : null, 
            this.animMov[0] ? this.animMov[0] : null, 
            this.scifiMov[0] ? this.scifiMov[0] : null, 
            this.othMov[0] ? this.othMov[0] : null 
          ];

        }
        catch(err){
          console.error(err);
        }
      },
      
      genreTab(arr){
        this.$router.push(
          {
            name:'genrePage',
            query:{
              data:JSON.stringify(arr)
            }
          }
        )
        arr.inactive = arr.active
      },

      search(){

        //empty searchresult array
        this.searchResult = [];

        //find input match
        let query = this.searchInput.toLowerCase();
        query = query.split(' ');

        for(let i in this.allMov){

          let mov = this.allMov[i].title.toLowerCase().split(' ');
          query.every(el => mov.includes(el)) ? this.searchResult.push(this.allMov[i]) 
          : null;

        }; 

        //chech if search result was found
        this.$router.push(
          {
            name:'searchPage',
            query:{
              data:JSON.stringify(this.searchResult)
            }
          }
        );

        //deactivate other tabs
        this.isClicked = null;
      }
    },
    created(){
      this.movieIcons = [
          {
            type:'action',
            arr: this.actMov,
            cur:(x)=>{
              return  x ? '../icons/spy.png' : '../icons/spy-active.png';
            }
          },
          {
            type:'adventure',
            arr: this.advMov,
            cur:(x)=>{
              return  x ? '../icons/adventure.png' : '../icons/adventure-active.png';
            }
          },
          {
            type:'animation',
            arr: this.animMov,
            cur:(x)=>{
              return  x ? '../icons/horror.png' : '../icons/horror-active.png';
            }
          },
          {
            type:'comedy',
            arr: this.comMov,
            cur:(x)=>{
              return  x ? '../icons/comedy.png' : '../icons/comedy-active.png';
            }
          },
          {
            type:'family',
            arr: this.famMov,
            cur:(x)=>{
              return  x ? '../icons/horror.png' : '../icons/horror-active.png';
            }
          },
          {
            type:'horror',
            arr: this.horMov,
            cur:(x)=>{
              return  x ? '../icons/horror.png' : '../icons/horror-active.png';
            }
          },
          {
            type:'romance',
            arr: this.lovMov,
            cur:(x)=>{
              return x ? '../icons/love.png' : '../icons/love-active.png';
            }
          },
          {
            type:'Sci-Fi',
            arr: this.scifiMov,
            cur:(x)=>{
              return  x ? '../icons/horror.png' : '../icons/horror-active.png';
            }
          },
          {
            type:'others..',
            arr: this.othMov,
            cur:(x)=>{
              return  x ? '../icons/horror.png' : '../icons/horror-active.png';
            }
          },
        ]
    },
    mounted(){
      this.getAPI(1,50)
    }
  }
</script>
<template>
  <div v-if="loading" class="container mx-auto w-full h-screen flex justify-center items-center">
    <img src="../favicon.png" alt="" class="aspect-auto w-1/4 lg:w-1/6 h-fit animate-pulse">
  </div>
  <div v-else class="container relative overflow-x-hidden px-7 mx-auto flex flex-col gap-6 sm:gap-10 md:gap-12 xl:gap-16">
    <nav class="flex justify-start py-7 sticky top-0 left-0 z-20">
      <a href="#" class="logo p-0">
        <img src="./assets/logo.png" class="nav-logo" alt="">
      </a>
    </nav>
    <div class="main-body flex flex-wrap gap-0 md:gap-10 lg:gap-7 xl:gap-16">
      <div class="min-h-fit flex-shrink-1 h-fit max-h-fit -translate-x-full md:translate-x-0 sticky top-0 z-10 transition-all ease-in-out duration-500 w-fit " :class="isVisible ? 'translate-x-0': null">
        <aside class="side-nav space-y-20 p-7 flex flex-col bg-green-700 md:opacity-100 transition-all ease-in-out duration-500" :class="isVisible ? 'opacity-100': 'opacity-0'">
          <div class="search-box">
            <div class="search-wrapper w-fit flex  gap-3.5 p-3.5 shadow shadow-red-500">
              <input type="text" name="search" id="search-input" class=' bg-transparent focus:outline-none flex-1 box-border' @keydown.enter="search" v-model="searchInput" >
              <RouterLink to="/searchPage" id="search-btn" class="w-fit  box-border" @click="search">search</RouterLink>
            </div>
          </div>
          <div class="flex flex-col space-y-3.5">
            <sidBtn :rout="'/'" @click="genreTab(trenMov)" >
              <template v-slot:title>something</template>
            </sidBtn>
            <SideBtn v-for="(i, index) in movieIcons" :icon="isClicked === index ? i.cur(false) : i.cur(true) "  @click="genreTab(i.arr), isClicked= index" :rout="'/genrePage'" class="transition-all delay-75">
              <template v-slot:title><h6 class="capitalize font-normal group-hover:font-medium group-hover:tracking-widest transition-all ease-in-out duration-500">{{ i.type }}</h6></template>
            </SideBtn>
          </div>
        </aside>
        <button type="button " @click="isVisible = !isVisible"  class=" py-7 px-3.5 flex items-center absolute top-1/2 left-full z-10 md:hidden bg-green-700">
          <span class="material-symbols-outlined transition-all ease-in-out duration-500" v-bind:class="{'rotate-180' : isVisible}">
            arrow_right
          </span>
        </button>
      </div>
      <div class='w-full grow-1 h-fit '>
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
<style scoped>
.nav-logo{
  height:var(--sizer);
}

::-webkit-scrollbar, ::-webkit-scrollbar-track{
    display: none !important;
}


</style>