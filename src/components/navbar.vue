<template>
    <div class="flex-shrink-1 h-fit max-h-full -translate-x-full md:translate-x-0 fixed md:sticky top-auto z-10 transition-all ease-in-out duration-500 w-fit  overflow-y-auto" :class="props.isVisible ? 'translate-x-0': null">
        <aside class="side-nav gap-3.5 flex flex-col  md:opacity-100 transition-all ease-in-out duration-500" :class="props.isVisible ? 'opacity-100': 'opacity-0'">
          <div class="search-box w-full py-4 bg-[var(--color-background)] sticky left-auto -top-1 z-[11]">
            <div class="search-wrapper w-fit flex items-center group gap-1.5 p-0">
              <input type="text" name="search" id="search-input" class=' bg-transparent focus:outline-none flex-1 box-border w-[12.5rem] p-2.5' @keydown.enter="search" v-model="searchInput" >
              <RouterLink to="/searchPage" id="search-btn" class=" h-auto max-h-fit text-[var(--text-m)] w-fit p-2.5 box-border" :class="searchInput ==='' ? 'text-[var(--text-m)]' : ' text-primary'" @click="search"><span>search</span></RouterLink>
            </div>
            <hr class="border-[var(--text-l)]"/>
          </div>
          <div class="flex flex-col gap-3">
            <SideBtn :rout="'/'" @click="changeGenre(100)" >
              <template v-slot:title>
                <span :class="isClicked === 100 ? ('text-[var(--text-h)] font-[600] tracking-widest') : null" >
                  trending
                </span>
              </template>
            </SideBtn>
            <SideBtn 
                v-for="(i, index) in movieIcons" 
                :icon="isClicked === index ? i.cur(false) : i.cur(true)"  
                @click="changeGenre(index)" 
                :rout="`/${i.type}`" 
                class="transition-all delay-75"
            >

              <template v-slot:title>
                <span class="group-hover:font-[600] group-hover:tracking-widest transition-all ease-in-out duration-500 group-hover:text-[var(--text-h)]" :class="isClicked === index ? ('text-[var(--text-h)] font-[600] tracking-widest') : null"
                > 
                  {{ i.type }} 
                </span>
              </template>

            </SideBtn>
          </div>
        </aside>
        <button type="button " @click="navSwitch"  class=" py-3.5 px-0.5 flex items-center absolute top-1/2 left-full z-[12] bg-green-700">
          <span class="material-symbols-outlined transition-all ease-in-out duration-500 hover:text-[var(--text-h)]" :class="props.isVisible? 'rotate-180' : null">
            arrow_right
          </span>
        </button>
    </div>
</template>

<script setup>
    
    import { computed, defineProps, onMounted, watch } from 'vue';
    import { movieIcons } from '@/util/navigationHelper';
    import { ref, defineEmits } from 'vue';
    import SideBtn from './sideBtn.vue';
    import { useGenre } from '@/stores/movieByGenre';
    import { useTrendStore } from '@/stores/trending';
    import { movieGenreCode } from '@/util/navigationHelper';
    import router from '@/router';

    const props = defineProps(['isVisible']); // this is for hiding and displaying navbar
    const isClicked = ref(null); /// stores the index of the nav button that has been clicked
    const searchInput = ref(''); // this stores user search input
    


    ///beforeEach every navigation isClicked value is updated 
    /// it checks if a genre params has been passed and if params[genre] is a valid genre
    ///else it checks if path is  '/' since the home page is the trending page 
    // either way isClicked accordingly 
    router.beforeEach((to, from, next)=>{
      const params = to.params;

      /// checks if genre exist in params, else checks if path is  '/'
      if(params.genre){
        
        ///finds the index of params genre in the array of acceptable genres (movieIcons)
        let genreIndex =  movieIcons.findIndex(gen => gen.type === params.genre.toLowerCase());
        
        //if genreIndex is not a number therefore genre is not valid and isClicked will not be updated        
        if(!isNaN(genreIndex) && genreIndex > 0) isClicked.value = genreIndex;
        else if(params.genre === 'trending') isClicked.value = 100;
  
              

      }else if(to.path === '/'){
        isClicked.value = 100
      }

      /// continues with navigation
      next();

    });


    // this function takes the index of the button from the array of buttons and set its as the active button
    const changeGenre = index => isClicked.value = index;
    const emit = defineEmits(['hideNav']);

    //this will hide or show side nav
    const navSwitch =()=> emit('hideNav', !props.isVisible);


    ///handles search query
    function search(params) {
    }


</script>