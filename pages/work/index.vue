<template>
  <div>
    <ul>
      <li v-for="(work, key) in works" :key="key">
        <nuxt-link :to="'/work/' + work.slug">{{ work.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'portfolio'
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
  }
}
</script>