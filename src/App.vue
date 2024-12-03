<script>
import {RouterView, RouterLink} from 'vue-router';
import SideBtn from './components/sideBtn.vue';
import GenreBody from './views/genreBody.vue';
import NavBar from './components/navbar.vue';
import { useGenre } from './stores/movieByGenre';
import LoadingWall from './components/loading.vue';
  export default {
    components: {
      SideBtn, GenreBody, NavBar, LoadingWall
    },
    data:()=>{
      return{
        movieIcons:null,
        loading:false,
        loadingErr : true,
        isVisible:false,
        isClicked:true,
        isSelected:''
      }
    },
    methods:{
      updateIsVisible(newValue){  this.isVisible = newValue; },

      // search(){

      //   //empty searchResult array
      //   this.searchResult = [];

      //   //find input match
      //   let query = this.searchInput.toLowerCase();
      //   query = query.split(' ');

      //   for(let i in this.allMov){

      //     let mov = this.allMov[i].title.toLowerCase().split(' ');
      //     query.every(el => mov.includes(el)) ? this.searchResult.push(this.allMov[i]) 
      //     : null;

      //   }; 

      //   //check if search result was found
      //   this.$router.push(
      //     {
      //       name:'searchPage',
      //       query:{
      //         data:JSON.stringify(this.searchResult)
      //       }
      //     }
      //   );

      //   //deactivate other tabs
      //   this.isClicked = null;
      // }
    },
    created(){
        // this.getAPI(1,5)
    },
    mounted(){
      // this.getAPI(1,5)
    }
    
  }
</script>
<template>
  //==== v-if
  <LoadingWall :loadingErr="loadingErr" />

  //==== v-else
  <div v-cloak class="container relative w-full h-full max-h-full max-w-full overflow-x-hidden overflow-y-auto px-[5vw] py-[2.5vh] mx-auto">
    <nav class="py-7 fixed block top-0 left-auto z-50 w-full bg-[var(--color-background)]">
      <a href="#" class="logo p-0">
        <img src="./assets/logo.png" class="nav-logo" alt="logo">
      </a>
    </nav>
    <main class=" pt-28 h-full flex gap-0 md:gap-10 lg:gap-7 xl:gap-16 sticky left-auto top-0 z-10 ">
      <NavBar :isVisible="isVisible" @hideNav="updateIsVisible" />
      <div class='h-full flex-1' :class="isVisible ? 'overflow-hidden' : 'overflow-y-auto'">
        <RouterView></RouterView>
      </div>
    </main>
  </div>
</template>
<style scoped>

::-webkit-scrollbar, ::-webkit-scrollbar-track{
    display: none !important;
}


</style>