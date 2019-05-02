<template>
  <section>
    <div class="my-8 text-center">
      <img :src="imageProfile" />
      <h1>{{ title }}</h1>
      <p>{{ content }}</p>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData ({ app, store }) {
    const locale = store.state.i18n.locale;
    const { data } = await app.$axios.post(`${process.env.COCKPIT_API_BASE_URL}/singletons/get/Homepage?token=${process.env.COCKPIT_API_KEY}`,
    JSON.stringify({
      lang: locale
    }),
    {
      headers: { 'Content-Type': 'application/json' }
    })

    return { homepage: data };
  },
  computed: {
    imageProfile() {
      return process.env.COCKPIT_ASSETS_BASE_URL + this.homepage.image.path;
    },
    title() {
      return this.homepage.title;
    },
    content() {
      return this.homepage.content.replace('__years__', 10);
    }
  }
}
</script>