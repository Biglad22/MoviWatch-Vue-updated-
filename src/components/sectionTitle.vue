<template>
    <h6 class=" mt-7 px-3.5 border-l-4 border-l-secondary capitalize mb-14">{{ title }}</h6>
</template>
<script setup>
    import { defineProps } from 'vue';

    defineProps({
        title: {
            type: String,
            required: true
        }
    })
</script>