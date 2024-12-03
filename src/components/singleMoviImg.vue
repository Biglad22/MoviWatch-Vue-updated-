<template>
    <div
        class="w-full h-[70vh] relative "
    >
        <!--movie banner-->
        <img :src="movieBanner" 
            alt="movie-banner" 
            class="w-full h-full rounded-sm object-cover object-top" 
        />

        <!--movie poster-->
        <img :src="moviePoster" 
            alt="movie-poster" 
            class=" h-[var(--h)] w-auto shadow-md  object-cover object-top absolute z-[51] bottom-0 left-0 sm:bottom-6 sm:left-6" 
        />

        <!--dark overlay for image banner-->
        <div class="bg-[var(--b-text-l)] w-full h-full absolute rounded-sm z-50 top-0 left-0"></div>
    </div>
</template>

<script setup>
    
    defineProps({
        movieBanner :{
            type: String,
            required : true
        },
        moviePoster :{
            type: String,
            required : true
        }
    })
</script>