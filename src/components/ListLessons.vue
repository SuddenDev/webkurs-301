<script lang="ts" setup>
import type { Course } from '@/types'

withDefaults(defineProps<{
  list?: Course[]
}>(), {
  list: () => [],
})

function getDate(date: string) {
  return new Date(date).toISOString()
}

function getHref(post: Course) {
  if (post.data.redirect)
    return post.data.redirect
  if (post.collection === 'course')
    return `/course/${post.id}`
  return `/posts/${post.id}`
}

function getTarget(post: Course) {
  if (post.data.redirect)
    return '_blank'
  return '_self'
}
</script>

<template>
  <ul sm:min-h-38 min-h-28 mb-18>
    <template v-if="!list || list.length === 0">
      <div my-12 opacity-50>
        nothing here yet.
      </div>
    </template>
    <li v-for="post in list" :key="post.data.title" class="mb-12 pb-12 border-b border-main border-op-50! last:border-none">
      <a flex="~ col gap-4" class="text-lg lh-tight nav-link opacity-92 dark:(opacity-85 hover:opacity-100)" :aria-label="post.data.title" :target="getTarget(post)" :href="getHref(post)">
        <div v-if="post.data.image" class="w-full">
          <img :src="post.data.image.src" :alt=" `${post.data.title} Cover Bild` || ''" class="w-full object-cover rounded-lg">
        </div>
        <div flex="~ col gap-2">
          <div flex="~ col md:row gap-2 md:items-center">
            <div flex="~ gap-2 items-center text-wrap">
              <span lh-normal font-medium>
                {{ post.data.title }}
              </span>
            </div>
            <div opacity-50 text-sm ws-nowrap>
              <time v-if="post.data.date" :datetime="getDate(post.data.date)">{{ post.data.date.split(',')[0] }}</time>
            </div>
          </div>
          <div v-if="post.data.description" opacity-70 text-sm>{{ post.data.description }}</div>
        </div>
      </a>
    </li>
  </ul>
</template>
