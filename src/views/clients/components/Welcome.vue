<template>
<div class="grid grid-cols-4 gap-4">
      <div class="">
        <ul role="list" class="rounded-lg bg-white divide-y divide-gray-100">
          <li v-for="(item, index) in surveys" class="flex justify-between gap-x-6 p-3">
            <div class="flex gap-x-4">
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  {{ item.title }}
                </p>
                <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                  {{ index == 0 ? "Finalizado" : "Pendiente" }}
                </p>
              </div>
            </div>
            <div v-if="index > 0" class="hidden sm:flex sm:flex-col sm:items-end">
              <p class="mt-1 text-xs leading-5 text-gray-500">20 Preguntas</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-span-3 rounded-lg bg-white p-3">
        <div class="px-6">
          <h3 class="text-base font-semibold leading-7 text-gray-900">
            Applicant Information
          </h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div class="px-8 mt-6 border-t border-gray-100">
          <dl class="divide-y divide-gray-100">
            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" v-for="item in dataStudent">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                {{ item.key }}
              </dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {{ item.value }}
              </dd>
            </div>
          </dl>

          <div class="border-t border-gray-100 pt-4 flex justify-end">
            <ButtonPrimary title="Guardar" />
            <ButtonPrimary class="ms-3" title="Guardar y continuar" />
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>

</script>