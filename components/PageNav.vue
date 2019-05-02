<template>
  <nav class="text-center my-4 flex items-center justify-center">
    <nuxt-link :to="localePath({ name: 'index' })" class="p-2 text-sm sm:text-lg inline-block text-grey-darkest no-underline hover:underline"><img src="~assets/img/logo.png" width="50px" /></nuxt-link>
    <nuxt-link :to="localePath({ name: 'experiences' })" class="p-2 text-sm sm:text-lg p-2 inline-block text-grey-darkest no-underline hover:underline">{{ $t('nav.experiences') }}</nuxt-link>
    <nuxt-link :to="localePath({ name: 'work' })" class="p-2 text-sm sm:text-lg p-2 inline-block text-grey-darkest no-underline hover:underline">{{ $t('nav.portfolio') }}</nuxt-link>
    <nuxt-link :to="localePath({ name: 'contact' })" class="p-2 text-sm sm:text-lg p-2 inline-block text-grey-darkest no-underline hover:underline">{{ $t('nav.contact') }}</nuxt-link>
    <nuxt-link :to="switchLocalePath('en')" v-if="showEnglish">English</nuxt-link>
    <nuxt-link :to="switchLocalePath('fr')" v-if="showFrench">Français</nuxt-link>
  </nav>
</template>

<script>
  export default {
    computed: {
      showEnglish() {
        return this.$store.state.i18n.locale !== 'en';
      },
      showFrench() {
        return this.$store.state.i18n.locale !== 'fr';
      }
    }
  }
</script>