<template>
  <div v-bind:class="classObject">
    <page-nav/>
    <div>
      <nuxt/>
    </div>
    <page-footer/>
  </div>
</template>

<script>
import PageNav from '~/components/PageNav.vue'
import PageFooter from '~/components/PageFooter.vue'
import { mapState } from 'vuex'

export default {
  components: {
    PageNav,
    PageFooter
  },
  computed: {
    classObject() {
      let classObject = {};
      classObject[this.$store.state.layoutClass] = true;
      return classObject;
    }
  }
}
</script>
