<script setup lang="ts">
import { computed } from 'vue'

const { href, type = 'default', expiresAt } = defineProps<{
  href: string
  type?: 'default' | 'rainbow'
  expiresAt?: string // Format: "YYYY-MM-DD" or "YYYY-MM-DD HH:mm" e.g. "2026-01-21" or "2026-01-21 14:30"
}>()

const isExpired = computed(() => {
  if (!expiresAt)
    return false

  // Parse the date string "YYYY-MM-DD" or "YYYY-MM-DD HH:mm"
  const [datePart, timePart] = expiresAt.split(' ')
  const [year, month, day] = datePart.split('-')

  let hours = 23
  let minutes = 59

  if (timePart) {
    [hours, minutes] = timePart.split(':').map(str => Number.parseInt(str))
  }

  const expirationDate = new Date(
    Number.parseInt(year),
    Number.parseInt(month) - 1, // Month is 0-indexed
    Number.parseInt(day),
    hours,
    minutes,
  )

  return Date.now() > expirationDate.getTime()
})
</script>

<template>
  <div
    v-if="!isExpired"
    class="announcement" :class="{
      'bg-indigo-500  dark:bg-indigo-600': type === 'default',
      'rainbow': type === 'rainbow',
    }"
  >
    <a
      class="inline-flex gap-2 items-center transition-color py-1.5 px-4 text-sm text-indigo-50!  hover:(underline dark:text-white)"
      :href target="_blank"
    >
      <slot />
      <div class="size-5 i-ph-arrow-square-out" />
    </a>
  </div>
</template>

<style scoped>
.announcement {
  width: 100%;
  text-align: center;
}
.rainbow {
  background: linear-gradient(50deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
  background-size: 500% 500%;
  animation: rainbow 18s ease infinite;
}
@keyframes rainbow {
  0% {
    background-position: 0% 82%;
  }
  50% {
    background-position: 100% 19%;
  }
  100% {
    background-position: 0% 82%;
  }
}
</style>
