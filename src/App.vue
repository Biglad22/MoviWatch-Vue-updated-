<script>
import {RouterView, RouterLink} from 'vue-router';
import SideBtn from './components/side-btn.vue';
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
        searchFound:false,
        searchResult:[],
      }
    },
    methods:{
      async getAPI(){
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTMxN2IwM2I3MmVmMjVkYWQwMjgzNmMyNDQwY2M5MyIsInN1YiI6IjY0NjQ1ZjdkZjQ4YjM0MDBlM2MwM2QyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sqqO92I_wuG0v1h8uh_fGnJtDB9Wx5EgWmMiNbo5PaA'
          }
        };

        try{

          for (let i = 1; i < 10; i++){
            let data = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${i}&sort_by=vote_average.desc`, options)
            data = await data.json();
            this.allMov = this.allMov.concat(data.results); 
          };

          console.log(this.allMov)
 

          for ( let i in this.allMov){

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
          this.trenMov=[this.actMov[0] ? this.actMov[0] : null, 
            this.comMov[0] ? this.comMov[0] : null,  
            this.advMov[0] ? this.advMov[0] : null,  
            this.horMov[0] ? this.horMov[0] : null, 
            this.lovMov[0] ? this.lovMov[0] : null, 
            this.famMov[0] ? this.famMov[0] : null, 
            this.animMov[0] ? this.animMov[0] : null, 
            this.scifiMov[0] ? this.scifiMov[0] : null, 
            this.othMov[0] ? this.othMov[0] : null 
          ];

          console.log(this.trenMov);

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
      },

      search(){
        const query = this.searchInput.toLowerCase();
        query = query.split(' ');

        for(let i in this.allMov){

          let mov = this.allMov[i].title.toLowerCase().split(' ');
          query.every(el => mov.includes(el)) ? (searchResult.push(this.allMov[i]), this.searchFound = true) 
          : this.searchFound = false

        };


      }
    },
    created(){
      this.movieIcons = [
          {
            type:'action',
            inactive:'./icons/adventure.png',
            active:'@/components/icons/spy-active.png',
            arr: this.actMov
          },
          {
            type:'adventure',
            inactive:"./components/icons/adventure.png",
            active:'@/components/icons/adventure-active.png',
            arr: this.advMov
          },
          {
            type:'animation',
            inactive:'@/components/icons/horror.png',
            active:'@/components/icons/horror-active.png',
            arr: this.animMov
          },
          {
            type:'comedy',
            inactive:'@/components/icons/comedy.png',
            active:'@/components/icons/comedy-active.png',
            arr: this.comMov
          },
          {
            type:'family',
            inactive:'@/components/icons/horror.png',
            active:'@/components/icons/horror-active.png',
            arr: this.famMov
          },
          {
            type:'horror',
            inactive:'@/components/icons/horror.png',
            active:'@/components/icons/horror-active.png',
            arr: this.horMov
          },
          {
            type:'romance',
            inactive:'@/components/icons/love.png',
            active:'@/components/icons/love-active.png',
            arr: this.lovMov
          },
          {
            type:'Sci-Fi',
            inactive:'@/components/icons/horror.png',
            active:'@/components/icons/horror-active.png',
            arr: this.scifiMov
          },
          {
            type:'others..',
            inactive:'@/components/icons/horror.png',
            active:'@/components/icons/horror-active.png',
            arr: this.othMov
          },
        ]
    },
    beforeMount(){
      this.getAPI()
    }
  }
</script>
<template>
  <div class="container px-7 md:px-0 mx-auto flex flex-col space-y-6 sm:space-y-10 md:space-y-12 xl:space-y-16">
    <nav class="flex justify-start py-7">
      <a href="#" class="logo p-0">
        <img src="./assets/logo.png" class="nav-logo" alt="">
      </a>
    </nav>
    <div class="main-body sm:flex space-x-0 sm:space-x-10 md:space-x-7 xl:space-x-16">
      <aside class="side-nav absolute right-full space-y-20 sm:static p-7 flex flex-col bg-green-700">
        <div class="search-box">
          <div class="search-wrapper flex space-x-3.5 p-3.5 shadow shadow-red-500">
            <input type="text" name="search" id="search-input" class=' bg-transparent focus:outline-none' @keydown.enter="search" v-model="searchInput" >
            <button type="button" id="search-btn " @click="search">search</button>
          </div>
        </div>
        <div class="flex flex-col space-y-3.5">
          <sidBtn :rout="'/'" @click="genreTab(trenMov)" >
            <template v-slot:title>something</template>
          </sidBtn>
          <SideBtn v-for="i in movieIcons" :icon="i.inactive" @click="genreTab(i.arr)" :rout="'/genrePage'">
            <template v-slot:title><h6 class="capitalize font-normal group-hover:font-medium group-hover:tracking-widest transition-all ease-in-out delay-75">{{ i.type }}</h6></template>
          </SideBtn>
        </div>
      </aside>
      <div class='w-full shrink'>
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
<style scoped>
.nav-logo{
  height:var(--sizer);
}


</style>