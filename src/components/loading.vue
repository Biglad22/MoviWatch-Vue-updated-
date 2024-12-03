<template>
    <div  class="container mx-auto w-full h-full flex flex-col justify-center items-center">
        <img 
            src="/favicon.png" 
            alt="Loading..." 
            :class="`aspect-auto w-1/4 lg:w-1/6 h-fit ${!loadingErr ? 'animate-pulse' : null}`"
        />
        <p 
            v-if="loadingErr"
            class="text-primary font-medium capitalize block text-center py-5 text-shadow-sm"
        >
            sorry something went wrong
        </p>
    </div>
</template>
<script setup>
    import { defineProps } from 'vue';

    defineProps({
        loadingErr:{
            type : Boolean,
            required : false
        }
    })
</script>