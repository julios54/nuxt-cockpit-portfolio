<template>
  <section>
    <article class="my-8">
      <h1 class="mt-2">
        {{ work.title }}
      </h1>
    </article>
  </section>
</template>

<script>
export default {
  async asyncData ({ app, params, error, payload, store }) {
    const locale = store.state.i18n.locale;
    if (payload) {
      return { work: payload }
    } else {
      let { data } = await app.$axios.post(
        `${process.env.COCKPIT_API_BASE_URL}/collections/get/Portfolio?token=${process.env.COCKPIT_API_KEY}`,
        JSON.stringify({
          filter: { slug: params.slug },
          lang: locale
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      if (!data.entries[0]) {
        return error({ message: '404 Page not found', statusCode: 404 })
      }

      return { work: data.entries[0] }
    }
  }
}
</script>