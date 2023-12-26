<template>
    <RouterLink :to='rout' class=" group flex align-middle space-x-3.5 justify-between p-3.5 hover:pe-3 transition-all delay-75 ease-in-out">
        <slot name="title"></slot>
        <img :src="icon"/>
    </RouterLink>
</template>
<script>
import {RouterLink, RouterView} from 'vue-router'
export default{
    props:[
        'icon',
        'rout'
    ]
}
</script>

<style scoped>
.svg{
    height:var(--m-padding);
    width:auto;
}

</style>