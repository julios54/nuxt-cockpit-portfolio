<template>
  <div>
    <section class="work-item-banner-container">
      <div class="container">
        <div class="work-item-banner">
          <h1 class="work-item-banner-title animated bounceIn faster">{{ work.title }}</h1>
          <p class="work-item-banner-content" v-html="description"></p>
          <div class="work-item-banner-stack-items">
            <div v-for="(stackItem,key) in work.stack" :key="key" class="work-item-banner-stack-item">
              {{ stackItem.value }}
            </div>
          </div>
          <a class="work-item-banner-link" :href="work.link" target="_blank" :title="work.title" v-if="work.link">{{ $t('work.view_project') }}</a>
        </div>
      </div>
    </section>

    <section class="work-item-content-container">
      <div class="container">
        <figure class="work-item-banner-thumbnail-container animated slideInUp faster">
          <img class="work-item-banner-thumbnail" :src="thumbnail">
        </figure>
      </div>
    </section>
  </div>
</template>

<script>
import nl2br from 'nl2br'
export default {
  head () {
    return {
      title: `JH-WEB | ${this.work.title} | ${this.work.stack.map((stackItem) => stackItem.value).join(' ')}`,
      meta: [
        { hid: 'description', name: 'description', content: this.work.description }
      ]
    }
  },
  computed: {
    thumbnail() {
      return `${process.env.COCKPIT_ASSETS_BASE_URL}/${this.work.image.path}`
    },
    description() {
      return nl2br(this.work.description)
    }
  },
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
  },
  mounted() {
    this.$store.commit('setLayoutClass', 'work-item')
  }
}
</script>