<template>
  <div class="blog">
    <div class="blog-post" v-for="(post, key) in posts" :key="key">
      <h2>{{ post.title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'blog'
    }
  },
  async asyncData({ app, store }) {
    const locale = store.state.i18n.locale
    const { data } = await app.$axios.post(
      `${process.env.COCKPIT_API_BASE_URL}/collections/get/Blog?token=${
        process.env.COCKPIT_API_KEY
      }`,
      JSON.stringify({
        sort: { date: -1 },
        lang: locale
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )

    return { posts: data.entries }
  },
  mounted() {
    this.$store.commit('setLayoutClass', 'blog')
  }
}
</script>