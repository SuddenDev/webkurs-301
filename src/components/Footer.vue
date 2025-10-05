<script lang="ts" setup>
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'
</script>

<template>
  <footer class="w-full mt-18 pt-6 pb-8 max-w-65ch text-sm flex flex-col sm:(flex-row justify-between) gap-4 border-main border-t !border-op-50 text-dark dark:text-white">
    <div v-if="siteConfig.footer.navLinks && siteConfig.footer.navLinks.length > 0" class="flex flex-wrap gap-4">
      <template v-for="(link, index) in siteConfig.footer.navLinks" :key="link.text">
        <a
          :aria-label="`${link.text}`" :target="getLinkTarget(link.href)" class="nav-link flex items-center"
          :href="link.href"
        >
          {{ link.text }}
        </a>
        <span v-if="index < siteConfig.footer.navLinks.length - 1" op-70> / </span>
      </template>
    </div>
    <div flex>
      <span op-70>&copy;&nbsp;&nbsp;{{ new Date().getFullYear() }}&nbsp;
        <a :href="siteConfig.authorUrl" target="_blank" class="nav-link">{{ siteConfig.author
        }}</a></span>
    </div>
  </footer>
</template>
