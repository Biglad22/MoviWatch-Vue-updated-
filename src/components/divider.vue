<template>
    <div class="flex items-center gap-2">

        <!--divider text if it exist-->
        <small v-if="dividerText" class=" uppercase tracking-wide text-[var(--text-l)] font-medium">
            {{ dividerText }}
        </small>

        <!--divider line-->
        <hr class="flex-1 border-[var(--text-l)]" />
    </div>
</template>
<script setup>
    import { defineProps } from 'vue';

    defineProps({
        dividerText : {
            type : String,
            required : false
        }
    })
</script>