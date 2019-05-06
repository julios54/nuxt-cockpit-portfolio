<template>
  <nav class="nav-container">
    <div class="container">
      <div class="nav">
        <div class="logo-container">
          <nuxt-link
            :to="localePath({ name: 'index' })"
            @click.native="clickMenu({routeName: 'home'})"
            class="logo"
          >
            {{ $t('back_to_home') }}
          </nuxt-link>
        </div>
        <div class="menu" v-bind:class="{'menu-mobile--hidden':menuHidden}">
          <div class="language-flags">
            <a
              href="javascript:void(0)"
              v-for="locale in availableLocales"
              :key="locale.code"
              :title="locale.name"
              @click="navigateToLocale(locale)"
            >
              <img :alt="locale.name" :src="locale.iconBase64">
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuHidden: true,
      nav: [
        {
          routeName: 'experiences',
          transKey: 'nav.experiences'
        },
        {
          routeName: 'work',
          transKey: 'nav.portfolio'
        },
        {
          routeName: 'contact',
          transKey: 'nav.contact'
        }
      ]
    }
  },
  methods: {
    toggleMenu() {
      this.menuHidden = !this.menuHidden
    },
    navigateToLocale(locale) {
      this.menuHidden = true
      const baseRouteName = this.$route.name.replace(/___.*$/, '')
      if (baseRouteName === 'blog-slug') {
        console.log(this.$store.state.blogPostSlugs[locale.code])
        if (locale.code === 'fr') {
          this.$router.push(
            `/blog/${this.$store.state.blogPostSlugs[locale.code]}`
          )
        } else {
          this.$router.push(
            `/${locale.code}/blog/${
              this.$store.state.blogPostSlugs[locale.code]
            }`
          )
        }
      } else {
        this.$router.push(this.switchLocalePath(locale.code))
      }
    },
    clickMenu(navItem) {
      this.menuHidden = true
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    showEnglish() {
      return this.$store.state.i18n.locale !== 'en'
    },
    showFrench() {
      return this.$store.state.i18n.locale !== 'fr'
    }
  }
}
</script>