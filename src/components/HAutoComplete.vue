<template>
    <Combobox v-model="selected">
        <div class="relative mt-1">
            <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <ComboboxInput class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    :displayValue="(item) => item?.[`${this.itemTitle}`]" @change="query = $event.target.value" />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>
            </div>
            <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0"
                @after-leave="query = ''">
                <ComboboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <div v-if="filteredItem.length === 0 && query !== ''"
                        class="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                    </div>

                    <ComboboxOption v-for="item in filteredItem" as="template" :key="item[`${this.itemValue}`]"
                        :value="item" v-slot="{ selected, active }">
                        <li class="relative cursor-default select-none py-2 pl-10 pr-4" :class="{
                            'bg-teal-600 text-white': active,
                            'text-gray-900': !active,
                        }">
                            <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                                {{ item[`${this.itemTitle}`] }}
                            </span>
                            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3"
                                :class="{ 'text-white': active, 'text-teal-600': !active }">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ComboboxOption>
                </ComboboxOptions>
            </TransitionRoot>
        </div>
    </Combobox>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import apiJson from "@/assets/jsonApi.json";
//import throttle from 'lodash/throttle';

const props = defineProps({
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
        default: null
    },
});

const emit = defineEmits(["update:modelValue"]);

const selected = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});


// let selected = ref(null)
let query = ref('')

let filteredItem = computed(() =>
    query.value === ''
        ? []
        : apiJson.filter((item) =>
            item.title
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.value.toLowerCase().replace(/\s+/g, ''))
        )
)

</script>
  