<template>
  <div>
    <h1>{{ contact.title }}</h1>
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'contact'
    }
  },
  async asyncData({ app, store }) {
    const locale = store.state.i18n.locale;
    const { data } = await app.$axios.post(
      `${process.env.COCKPIT_API_BASE_URL}/singletons/get/Contact?token=${process.env.COCKPIT_API_KEY}`,
      JSON.stringify({
        sort: { from: -1 },
        lang: locale
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )

    return { contact: data }
  },
  mounted() {
    this.$store.commit('setLayoutClass', 'contact')
  }
}
</script>