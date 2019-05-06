<template>
  <div>
    <section class="blog-post-banner-container">
      <div class="container">
        <div class="blog-post-banner">
          <figure class="blog-post-banner-thumbnail-container animated fadeIn">
            <img class="blog-post-banner-thumbnail" :src="thumbnail">
          </figure>
          <h1 class="blog-post-banner-title animated bounceIn faster">{{ post.title }}</h1>
          <p class="blog-post-banner-content">{{ post.chapo }}</p>
        </div>
      </div>
    </section>

    <section class="container blog-post-content-container">
      <div class="blog-post-content">
        <article class="content" v-html="$md.render(post.content)"></article>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params, error, payload, store }) {
    const locale = store.state.i18n.locale
    if (payload) {
      return { post: payload }
    } else {
      let postBody = {
        filters: {}
      }
      if (locale === 'fr') {
        postBody.filters['slug'] = params.slug
      } else {
        postBody.filters['slug_' + locale] = params.slug
      }
      let { data } = await app.$axios.post(
        `${process.env.COCKPIT_API_BASE_URL}/collections/get/Blog?token=${
          process.env.COCKPIT_API_KEY
        }`,
        JSON.stringify(postBody),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      if (!data.entries[0]) {
        return error({ message: '404 Page not found', statusCode: 404 })
      }

      let post = {}
      const postData = data.entries[0]

      const blogPostSlugs = {
        en: postData['slug_en'],
        fr: postData['slug']
      }

      if (locale !== 'fr') {
        post.slug = postData['slug_' + locale]
        post.content = postData['content_' + locale]
        post.chapo = postData['chapo_' + locale]
        post.image = postData['image_' + locale]
        post.title = postData['title_' + locale]
        post.date = postData.date
      } else {
        post = postData
      }

      store.commit('setBlogPostSlugs', blogPostSlugs)

      return { post: post }
    }
  },
  computed: {
    thumbnail() {
      return `${process.env.COCKPIT_ASSETS_BASE_URL}/${this.post.image.path}`
    }
  },
  mounted() {
    this.$store.commit('setLayoutClass', 'blog-post')
  }
}
</script>