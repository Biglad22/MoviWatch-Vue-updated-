<template>

    <!-- headline image -->
    <div class="head-img w-full min-h-[70vh] relative">

        <div class=" w-full h-full absolute bg-gradient-to-b from-transparent from-30% to-[rgba(0,0,0,0.8)] top-0 left-0 z-10"></div>
        <img 
            :src="'./'" 
            alt=""
            class="w-full h-full border-none "
        />

        <!-- headline movie title and description -->
        <div
            class="p-12 absolute w-full z-[11] bottom-0 left-0"
        >
            <h4 class="capitalize font-semibold">{{ 'title go here' }}</h4>
            <p class="capitalize font-light">{{ 'creator goes here' }}</p>
        </div>


        <!-- coming soon tag -->
         <div class="w-fit h-fit p-4 absolute top-0 left-0 z-[13] bg-[#D90000] shadow-xl" >
            <h5 class=" font-medium leading-none text-gray-100">
                Coming Soon
            </h5>
         </div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    defineProps({
        headLineMovies : {
            type: Array,
            required: true 
        }
    });

</script>