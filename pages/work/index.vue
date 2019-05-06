<template>
  <div class="works">
    <div class="work" v-bind:class="animatedClasses(key)" v-for="(work, key) in works" :key="key">
      <div class="work-left">
        <img :src="workImagePath(work)" />
      </div>
      <div class="work-right">
        <nuxt-link :to="'/work/' + work.slug">Voir</nuxt-link>
        <h2>{{ work.title }}</h2>
        <p>{{ work.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'works'
    }
  },
  methods: {
    workImagePath(work) {
      return `${process.env.COCKPIT_ASSETS_BASE_URL}/${work.image.path}`
    },
    animatedClasses(key) {
      let classes = {
        'animated': true
      }
      if (key === 0) {
        Object.assign(classes, {
          'fadeInDown faster': true
        })
      } else {
        Object.assign(classes, {
          'fadeInUp fast': true
        })
      }
      return classes
    }
  },
  async asyncData({ app, store }) {
    const locale = store.state.i18n.locale;
    const { data } = await app.$axios.post(
      `${process.env.COCKPIT_API_BASE_URL}/collections/get/Portfolio?token=${process.env.COCKPIT_API_KEY}`,
      JSON.stringify({
        sort: { date: -1 },
        lang: locale
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )

    return { works: data.entries }
  },
  mounted() {
    this.$store.commit('setLayoutClass', 'works')
  }
}
</script>