<template>
    <div class="container max-w-[var(--w)] w-[var(--w)]  flex flex-col relative">
        <img :src="src" alt="" class="card-img max-w-full h-[var(--h)]"/>
        <div class="details px-0 py-3.5">
            <p class="ratings sm:text-base md:text-lg  xl:text-xl ">
                <span class="text-[var(--text-m)]">
                    <slot name="ratings"></slot>
                </span>
                <span class=" ms-1.5 text-[var(--text-l)]">
                    ( <slot name="no-vote"></slot> )
                </span>
            </p>
            <p class="font-semibold text-[var(--text-h)]  whitespace-nowrap overflow-hidden text-nowrap text-ellipsis h-[var(--text-wrap)] max-h-[var(--text-wrap)] hover:h-auto hover:p-2.5 hover:scale-110">
                <slot name="title" ></slot>
            </p>
            <p  class="capitalize">release date:
                <span class="text-[var(--text-m)]">
                    <slot name="release-date"></slot>
                </span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props:[
        'src'
    ]
}
</script>
<style>
:root{
 --w : calc(8 * var(--gap));
 --h : calc(1.5 * var(--w));
}
</style>
