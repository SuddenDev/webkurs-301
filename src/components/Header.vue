<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref, unref } from 'vue'
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'
import ThemeToggle from './ThemeToggle.vue'

const navLinks = siteConfig.header.navLinks || []

const socialLinks = computed(() => {
  return siteConfig.socialLinks
})

const { y: scroll } = useWindowScroll()

const oldScroll = ref(unref(scroll))

onMounted(() => {
  const navMask = document.querySelector('.nav-drawer-mask') as HTMLElement

  navMask?.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })

  const headerEl = document.querySelector('#site-header') as HTMLElement
  if (!headerEl)
    return

  if (document.documentElement.scrollTop > 100)
    headerEl.classList.add('header-bg-blur')

  window.addEventListener('scroll', () => {
    if (scroll.value < 150) {
      headerEl.classList.remove('header-hide')
      return
    }

    if (scroll.value - oldScroll.value > 150) {
      headerEl.classList.add('header-hide')
      oldScroll.value = scroll.value
    }

    if (oldScroll.value - scroll.value > 150) {
      headerEl.classList.remove('header-hide')
      oldScroll.value = scroll.value
    }
  })
})
</script>

<!-- announcement -->
<!-- <div class="announcement w-full text-center bg-indigo-500  dark:bg-indigo-600">
  <a
    class="inline-flex gap-2 items-center transition-color py-1.5 px-4 text-sm text-indigo-50!  hover:(underline dark:text-white)"
    href="https://forms.gle/8wJ1mc4Z7oV3e7pbA" target="_blank"
  >
    Hier Zwischenabgabe WiSe 2025/26 einreichen
    <div class="size-5 i-ph-arrow-square-out" />
  </a>
</div> -->

<template>
  <header
    id="site-header" :class="{ 'header-bg-blur': scroll > 20 }" view-transition-name="site-header"
    class="!fixed bg-transparent z-899 w-screen "
  >
    <!-- main header -->
    <div class="px-6 h-20 flex items-center relative gap-4 md:gap-6">
      <!-- Site name on the left -->
      <div class="flex items-center">
        <a href="/" class="hidden sm:inline-block" aria-label="Header Logo">
          Digitalkompetenzen
        </a>
        <a href="/" class="sm:hidden" aria-label="Header Logo" title="Digitalkompetenz">
          Dig.Kom.
        </a>
      </div>
      <!-- Navigation links in the center -->
      <div class="flex-1 flex justify-end md:(justify-start)">
        <nav class="flex gap-x-4 sm:gap-x-2 md:(pl-4 b-l border-main)">
          <a
            v-for="link in navLinks" :key="link.text" :aria-label="`${link.text}`" :target="getLinkTarget(link.href)"
            :href="link.href"
            class="flex items-center gap-2 text-link opacity-70 hover:opacity-100 transition-all duration-200 cursor-pointer sm:(py-2 px-3) rounded-lg hover:bg-black/10 hover:dark:bg-slate-600/40 backdrop-blur-xl"
          >
            {{ link.text }}
            <!-- <div v-if="link.icon" class="size-5" :class="link.icon" /> -->
          </a>
        </nav>
      </div>
      <!-- Website link and theme toggle on the right -->
      <div class="flex gap-x-4 items-center md:pr-4">
        <a
          v-for="link in socialLinks" :key="link.text" :aria-label="`${link.text}`"
          :class="`${link.icon === '' ? 'text-sm' : 'link-icon'} hidden sm:inline-block`" class="nav-link"
          :target="getLinkTarget(link.href)" :href="link.href"
        >{{ link.icon === "" ? link.text : "" }}</a>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-hide {
  transform: translateY(-100%);
  transition: transform 0.4s ease;
}

.header-bg-blur {
  --at-apply: backdrop-blur-sm;
}

.nav-drawer {
  transform: translateX(-100%);
  --at-apply: box-border fixed h-screen z-999 left-0 top-0 min-w-32vw max-w-50vw bg-main p-6 text-lg flex flex-col gap-5
    transition-all;
}
</style>
