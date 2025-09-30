import mediumZoom from 'medium-zoom'

/**
 * Initialize medium-zoom for all images within prose content
 * Integrates with the site's dark/light theme system and preserves Astro's image optimization
 */
function initializeMediumZoom() {
  // Get the current theme from document class or data attribute
  const isDark = document.documentElement.classList.contains('dark')
    || document.querySelector('html').dataset.theme === 'dark'

  const images = [...document.querySelectorAll('.prose img')].filter(el => el.src !== 'https://codesandbox.io/static/img/play-codesandbox.svg')

  // Configure medium-zoom for all prose images (preserves Astro optimization)
  const zoom = mediumZoom(images, {
    margin: window.innerWidth > 1024 ? 100 : 16,
    background: isDark
      ? 'rgba(13, 17, 23, 0.9)' // Dark theme background (matching bg-hex-0d1117)
      : 'rgba(238, 245, 252, 0.9)', // Light theme background (matching bg-hex-eef5fc)
    scrollOffset: 40,
    container: document.body,
    template: null,
  })

  // Listen for theme changes and update zoom background
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes'
        && (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme')) {
        const newIsDark = document.documentElement.classList.contains('dark')
          || document.querySelector('html').dataset.theme === 'dark'

        // Update background color when theme changes
        zoom.update({
          background: newIsDark
            ? 'rgba(13, 17, 23, 0.9)'
            : 'rgba(238, 245, 252, 0.9)',
        })
      }
    })
  })

  // Observe theme changes on html element
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme'],
  })

  return zoom
}

// Re-initialize on Astro page transitions
document.addEventListener('astro:page-load', initializeMediumZoom)
