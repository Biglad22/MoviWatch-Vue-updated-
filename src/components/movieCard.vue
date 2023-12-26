<template>
    <div class="container flex flex-col">
        <img src="" alt="" class="card-img w-full h-auto"/>
        <div class="details p-3.5">
            <p class="ratings sm:text-base md:text-lg  xl:text-xl ">
                <slot name="ratings"></slot>
            </p>
            <p class=" font-semibold">
                <slot name="title" ></slot>
            </p>
            <p>release date:
                <span>
                    <slot name="release-date"></slot>
                </span>
            </p>
        </div>
    </div>
</template>

