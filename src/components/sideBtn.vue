<template>
    <RouterLink :to='rout' class=" group flex items-center space-x-3.5 justify-between p-2.5 hover:pe-2 transition-all ease-in-out duration-500">
        <slot name="title"></slot>

        <Transition name="icon-fade">
            <img :src="icon" class="svg h-[var(--side-icon)] w-auto "/>
        </Transition>
    </RouterLink>
</template>
<script>
import {Transition}  from 'vue';
import {RouterLink, RouterView} from 'vue-router'
export default{
    props: [
        'icon',
        'rout'
    ],
}
</script>

<style scoped>
.icon-fade-enter-active, .icon-fade-leave-active{
    transition: all 5s;
    opacity:1;
}
.icon-fade-enter-from, .icon-fade-leave-to{
    opacity: 0;
}

</style>