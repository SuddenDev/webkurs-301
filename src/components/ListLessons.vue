<script lang="ts" setup>
interface Post {
  id: string
  slug: string
  body: string
  data: Record<string, any>
  collection: string
  render: any
}

withDefaults(defineProps<{
  list?: Post[]
}>(), {
  list: () => [],
})

function getDate(date: string) {
  return new Date(date).toISOString()
}

function getHref(post: Post) {
  if (post.data.redirect)
    return post.data.redirect
  if (post.collection === 'course')
    return `/course/${post.slug}`
  return `/posts/${post.slug}`
}

function getTarget(post: Post) {
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
    <li v-for="post in list" :key="post.data.title" mb-8>
      <a text-lg lh-tight nav-link flex="~ col gap-4" :aria-label="post.data.title" :target="getTarget(post)" :href="getHref(post)">
        <div v-if="post.data.image" class="w-full">
          <img :src="post.data.image.src" :alt="post.data.image.alt || post.data.title" class="w-full h-48 object-cover rounded-lg">
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
