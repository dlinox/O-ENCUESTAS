<template>
    <div class=" ">
        <slot name="activator" :modal="() => isOpen = !isOpen">
            <button type="button" @click="openModal"
                class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Open dialog
            </button>
        </slot>

    </div>

    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all"
                            :class="density">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                {{ title }}
                            </DialogTitle>
                            <div class="mt-2">
                                <slot name="content" :modal="() => isOpen = !isOpen">

                                    <p class="text-sm text-gray-500">
                                        contenido del modal
                                    </p>
                                </slot>
                            </div>

                            <div class="mt-2 flex justify-end">
                                <slot name="actions" :modal="() => isOpen = !isOpen">

                                    <button type="button"
                                        class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                        @click="closeModal">
                                        Cerrar
                                    </button>
                                </slot>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { ref } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

defineProps({
    title: String,
    density: {
        type: String,
        default: 'max-w-md',
    },

});

const isOpen = ref(false)

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}
</script>
  