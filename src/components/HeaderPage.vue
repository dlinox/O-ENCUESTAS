<template>
    <section class="mx-auto w-full px-8 py-3 sm:px-8 lg:px-10 flex justify-between items-center bg-white shadow">
        <div>
            <h2 class="text-xl font-bold tracking-tight text-gray-900">
                {{ title }}
            </h2>
            <span class="titulo text-sm font-semibold text-gray-400">
                {{ subtitle }}
            </span>
        </div>

        <div>
            <slot name="actions">
        
            </slot>
        </div>

    </section>
</template>
<script setup>
defineProps({
    title: String,
    subtitle: String,
});
</script>