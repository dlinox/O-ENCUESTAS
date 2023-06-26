<template>
    <HeaderPage title="Encuestas" subtitle=" Encuestas Publicadas">
        <template #actions>
            <router-link to="/admin/surveys/create">
                <ButtonPrimary title="Nueva" />
            </router-link>
        </template>
    </HeaderPage>



    <div class="mx-auto max-w-7xl">
        <div class="p-4 bg-white my-4">
            <ul role="list" class="divide-y divide-gray-100">
                <li v-for="survey in surveys" :key="survey.id" class="flex justify-between gap-x-6 py-5 relative group ">
                    <div class="flex gap-x-4 ">
                        <div class="h-12 w-12 p-2 flex-none rounded-sm bg-blue-50 text-blue-500">
                            <ClipboardDocumentListIcon />
                        </div>

                        <div class="min-w-0 flex-auto">
                            <p class="text-sm font-semibold leading-6 text-gray-900 uppercase">{{ survey.title }}</p>
                            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ survey.description ?
                                survey.description : 'Descripciond de la encuesta' }}</p>
                        </div>
                    </div>
                    <div class="hidden text-center  sm:flex sm:flex-col sm:items-end ">
                        <p class="text-sm  leading-6 text-gray-900">{{ survey.stage }}</p>
                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Publicado: 23 de junio de 2023
                        </p>
                    </div>
                    <div
                        class=" group-hover:opacity-100  opacity-0 absolute top-0 right-0 sm:flex sm:flex-col sm:items-end bg-white shadow-lg border">
                        <button class="h-9 w-9 p-2 flex-none">
                            <EllipsisVerticalIcon />
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ClipboardDocumentListIcon, EllipsisVerticalIcon } from '@heroicons/vue/20/solid';
import ButtonPrimary from '../../../components/ButtonPrimary.vue';

import { useDataStore } from "../../../store/index"
import HeaderPage from '../../../components/HeaderPage.vue';

const dataStore = useDataStore();

const surveys = dataStore.surveys;

const people = [
    {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        role: 'Co-Founder / CTO',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        role: 'Business Relations',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
    {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        role: 'Front-end Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        role: 'Designer',
        imageUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        role: 'Director of Product',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
]
</script>