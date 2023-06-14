<template>
    <Listbox class="w-56" v-model="selectedItem">
        <div class="relative mt-1">
            <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                <span class="block truncate" :class="selectedItem ? 'text-black' : 'text-gray-400'">
                    {{ labelItem }}
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>
            <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption v-slot="{ active, selected }" v-for="option in options" :key="option"
                        :value="option[`${itemValue}`]" as="template">
                        <li :class="[
                            active ? 'bg-blue-100 text-blue-900' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]" @click="() => labelItem = option[`${itemTitle}`]">
                            <span :class="[
                                selected ? 'font-medium text-blue-600' : 'font-normal',
                                'block truncate',
                            ]">{{ option[`${itemTitle}`] }}</span>
                            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
    options: {
        type: Array,
        default: [
            { id: 1, title: 'Opción 1' },
            { id: 2, title: 'Opción 2' },
        ],
    },
    itemValue: {
        type: String,
        default: 'id'
    },
    itemTitle: {
        type: String,
        default: 'title'
    },
    modelValue: {
        type: [String, Number, Object],
        default: null,
    },
});

const emit = defineEmits(["update:modelValue"]);
const selectedItem = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

const labelItem = ref(selectedItem
    ? props.options.find((item) => item[`${props.itemValue}`] == selectedItem.value)[`${props.itemTitle}`]
    : "Seleccione un item");
</script>
  