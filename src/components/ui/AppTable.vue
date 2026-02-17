<script setup lang="ts">
defineProps<{
  emptyMessage?: string
  isEmpty?: boolean
  striped?: boolean
  hover?: boolean
}>()
</script>

<template>
  <div class="table-responsive">
    <table class="table align-middle mb-0" :class="{ 'table-striped': striped, 'table-hover': hover }">
      <thead v-if="$slots.thead" class="bg-body-secondary text-body-secondary">
        <slot name="thead" />
      </thead>
      <tbody>
        <slot name="tbody" />
        <tr v-if="emptyMessage && isEmpty" class="text-center text-body-secondary">
          <td colspan="100" class="py-5">{{ emptyMessage }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
