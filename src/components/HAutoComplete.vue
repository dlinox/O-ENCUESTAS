<template>
  <Combobox v-model="selected">
    <div class="relative mt-1 first-letter:uppercase">
      <label
        class="block text-sm font-medium leading-6 text-gray-900 first-letter:uppercase"
      >
        {{ label }}
      </label>
      <div class="relative w-full cursor-default overflow-hidden sm:text-sm">
        <ComboboxInput
          :class="
            error && errorThis && !selected ? 'ring-red-600' : 'ring-gray-300'
          "
          class="capitalize w-full bg-gray-50 border-gray-300 border-none p-2.5 text-sm leading-5 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 rounded-md"
          :displayValue="(item) => item?.[`${itemTitle}`]"
          @change="query = $event.target.value"
          :placeholder="placeholder"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
        
          class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="filteredItem.length === 0 && query !== ''"
            class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            Sin datos
          </div>

          <ComboboxOption
            v-for="item in filteredItem"
            as="template"
            :key="item[`${itemValue}`]"
            :value="item"
            v-slot="{ selected, active }"

            :disabled="isDisabled"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-teal-600 text-white': active,
                'text-gray-900': !active,
              }"
            >
              <span
                class="block truncate first-letter:uppercase"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ item[`${itemTitle}`] }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-teal-600': !active }"
              >
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
import { ref, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const open = ref(true);

const props = defineProps({
  itemValue: {
    type: String,
    default: "id",
  },
  itemTitle: {
    type: String,
    default: "title",
  },
  modelValue: {
    type: [String, Number, Object],
    default: null,
  },
  items: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    // default: 'Label'
  },
  error: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    // default: 'Label'
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

let query = ref("");
let errorThis = ref(false);

let filteredItem = computed(() =>
  // query.value === ""
  //   ? []
  //   : 
  props.items.filter((item) =>
        item[`${props.itemTitle}`]
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);
</script>
