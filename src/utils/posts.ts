import type { Course } from '@/types'
import { getCollection } from 'astro:content'

export function sortPostsByDate(itemA: Course, itemB: Course) {
  return new Date(itemB.data.date).getTime() - new Date(itemA.data.date).getTime()
}
export function sortByFileName(itemA: Course, itemB: Course) {
  return itemA.id.localeCompare(itemB.id)
}

export async function getCourses(path?: string, collection: 'course' = 'course') {
  return (await getCollection(collection, (post) => {
    return (import.meta.env.PROD ? post.data.draft !== true : true) && (path ? post.id.includes(path) : true)
  }))
    .sort(sortByFileName)
}
