<template>
    <div class=" bg-blue-50 w-screen h-screen px-12">
        <div class="relative">
            <InputForm @clickInput="openShowItems" label="ej autocomplete" v-model="term" @update:modelValue="getData" />
            <div v-if="showItems"
                class="rounded-lg shadow bg-white mt-6 border-t border-gray-100 absolute top-10 left-0 w-full max-h-42 overscroll-auto">
                <dl class="divide-y divide-gray-100">
                    <div v-for="result in results"
                        class="hover:bg-blue-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4  cursor-pointer"
                        @click="selectItem(result)">
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {{ result.id }} {{ result.title }}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import InputForm from '@/components/Forms/InputForm.vue'

const props = defineProps({
    modelValue: {
        type: [Number, Object, String, Array],
        default: null
    },
    question: Object
});
const emit = defineEmits(["update:modelValue"]);

const apiJson =  ref([]);

const showItems = ref(false);
const results = ref(null);
const dataApi = ref(apiJson);
const term = ref("");

const result = ref(null);

const input = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

const getData = async (e) => {
    if (e == "" || e == null) {
        results.value = null;
        showItems.value = false;
        return;
    }
    else {
        console.log(e);
        setTimeout(() => {
            let res = dataApi.value.filter((item) => item.title.toLowerCase().indexOf(e) > -1);
            results.value = res;
            showItems.value = true;
        }, 1000)
    }
}

const openShowItems = () => {
    showItems.value = true;
}

const selectItem = (item) => {
    showItems.value = false;
    term.value = item.title;
    result.value = item.userId;
    //input.value = item.userId;
    emit("update:modelValue", item.id)
    //console.log('input: ', input.value);
}

</script>