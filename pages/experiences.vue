<template>
  <div>
    <ul>
      <li v-for="(experience, key) in experiences" :key="key">
        {{ experience.companyName }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'experiences'
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
  }
}
</script>