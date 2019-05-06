<template>
  <div class="experiences">
    <div class="experience" v-bind:class="animatedClasses(key)" v-for="(experience, key) in experiences" :key="key">
      <div class="experience-left">
        <img :src="companyLogoPath(experience)" />
        <h2>{{ experience.companyName }}</h2>
      </div>
      <div class="experience-right">
        <p v-html="experience.description"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'experiences'
    }
  },
  methods: {
    companyLogoPath(experience) {
      return `${process.env.COCKPIT_ASSETS_BASE_URL}/${experience.companyLogo.path}`
    },
    animatedClasses(key) {
      let classes = {
        'animated': true
      }
      if (key % 2 == 0) {
        Object.assign(classes, {
          'fadeInLeft fast': true
        })
      } else {
        Object.assign(classes, {
          'fadeInRight fast': true
        })
      }
      return classes
    }
  },
  async asyncData({ app, store }) {
    const locale = store.state.i18n.locale;
    const { data } = await app.$axios.post(
      `${process.env.COCKPIT_API_BASE_URL}/collections/get/Experiences?token=${process.env.COCKPIT_API_KEY}`,
      JSON.stringify({
        sort: { from: -1 },
        lang: locale
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )

    return { experiences: data.entries }
  },
  mounted() {
    this.$store.commit('setLayoutClass', 'experiences')
  }
}
</script>