<template>
  <div class="flex flex-row justify-center">
    <div class="overflow-hidden content flex flex-col p-4 md:p-8">
      <page-nav/>
      <nuxt/>
      <page-footer/>
    </div>
  </div>
</template>

<script>
import PageNav from '~/components/PageNav.vue'
import PageFooter from '~/components/PageFooter.vue'

export default {
  components: {
    PageNav,
    PageFooter
  }
}
</script>
