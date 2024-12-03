<template>
    <!-- loading wall -->
    <LoadingWall 
        v-if="loadingState.loading"   
        :loading-err="loadingState.err"
    />

    <!-- main content -->
    <div v-else class="h-full overflow-y-auto flex flex-col w-full gap-6">
        <HeadlineMovie />
        <Divider divider-text="trending" class="mt-6"/>
        <div 
            class="flex max-w-full min-h-fit overflow-x-auto flex-row  gap-4"
        >
            <!-- <div class='basis-1/2 sm:basis-1/3 md:basis-1/4 shrink grow'> -->
            <movieCard  
                v-for="mov in movieList" 
                :movie="mov" 
                :key="mov.title"
                class='basis-1/2 sm:basis-1/3 md:basis-1/4 shrink grow'
            />
        </div>
    </div>
</template>
<script setup>
    import HeadlineMovie from '@/components/headlineMovie.vue';
    import { computed, onMounted, ref } from 'vue';
    import { useTrendStore } from '@/stores/trending';
    import movieCard from '@/components/movieCard.vue';
    import LoadingWall from '@/components/loading.vue';
    import Divider from '@/components/divider.vue';


    /// variable used to determine wether loading wall should be removed or there has been an error
    const loadingState = ref({
        loading : true,
        err: false
    })

    const trendStore = useTrendStore(); /// access trending movies store
    const movieList  = computed(()=>trendStore.trendingMovies); /// get list of movies that are trending
    
    
    onMounted(()=>{
        // handles data fetching on mount of view, making an api call  
        try{
            trendStore.getTrendingMovies();
            loadingState.value.loading = false; // if call is successful, LoadingWall is removed
        }catch(err){
            /// if call is unsuccessful LoadingWall remains with an error message
            loadingState.value = {
                loading : true,
                err: true
            };
            console.log(err);
        }
    });
</script>