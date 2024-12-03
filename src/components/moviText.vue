<template>
    <p v-if="!large" class="text-[var(--text-m)] mb-3" >
        <h6 v-if="title" class="text-[var(--text-h)] mr-2 capitalize font-medium inline-block">{{ title }}</h6> 
        <span>{{ body }}</span>
    </p>
    <h5 v-else class="text-[var(--text-m)] mb-3" >
        <h4 v-if="title" class="text-[var(--text-h)] mr-2 capitalize font-medium inline-block">{{ title }}</h4> 
        <span>{{ body }}</span>
    </h5>
</template>
<script setup>
    import { defineProps } from 'vue';

    defineProps({
        title : {
            type : String,
            required : false,
        },
        body : {
            type : String,
            required: true,
        },
        large : {
            type: Boolean,
            required : false
        }
    })
</script>