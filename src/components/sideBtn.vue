<template>
    <RouterLink :to='rout' class=" group flex items-center space-x-3.5 justify-between p-2.5 hover:pe-2 transition-all ease-in-out duration-500">
        <slot name="title">default title</slot>

        <img :src="icon" class="svg h-[var(--side-icon)] w-auto "/>
    </RouterLink>
</template>
<script>

export default{
    props: [
        'icon',
        'rout'
    ],
}
</script>