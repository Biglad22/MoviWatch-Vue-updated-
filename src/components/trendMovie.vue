<template>
    <div class="flex flex-wrap space-x-7 space-y-7">
        <img src="" alt="" class="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 w-auto h-auto" />
        <div class="del grow ">
            <p class="tracking-widest mb-14 uppercase text-xs ">
                <slot></slot>
            </p>
            <h6 class=" capitalize mb-3.5 font-medium text-wrap text-ellipsis">
                <slot></slot>
            </h6>
            <p class=" italic font-normal mb-7">
                <slot></slot>
            </p>
            <p class=" text-wrap text-ellipsis">
                <slot></slot>
            </p>
        </div>
    </div>
</template>