<template>
  <div>
    <section class="home-banner-container">
      <div class="home-banner">
        <figure class="home-banner-image-profile-container image is-128x128">
          <img class="home-banner-image-profile is-rounded" :src="imageProfile" />
        </figure>
        <h1 class="home-banner-title">{{ title }}</h1>
        <p class="home-banner-content">{{ content }}</p>
        <div class="home-banner-logos">
          <a v-for="(stackItem,key) in stack" :key="key" class="home-banner-logo" :href="stackItem.link" :title="stackItem.title" target="_blank">
            <img :src="stackItem.logo" />
          </a>
        </div>
      </div>
    </section>

    <section class="container home-content-container">
      <div class="home-content">
        <div class="home-portfolio-container">
          <div class="home-portfolio">
            <h1 class="home-portfolio-title">{{ $t('home.portfolio_title')}}</h1>
            <p class="home-portfolio-subtitle">Découvrez quelques uns de mes travaux réalisés en tant que freelance</p>
            <div class="home-portfolio-items">
              <div class="home-portfolio-item" v-for="(work,workKey) in works" :key="workKey" :style="`background-image: url('${workImagePath(work)}')`" @click="navigateToWork(work)">
                <div class="home-portfolio-item-information">
                  <h2 class="home-portfolio-item-information-title">
                    <nuxt-link :to="localePath({ name: 'work-slug', params: { slug: work.slug } })" class="home-portfolio-item-information-link">
                      {{ work.title }}
                    </nuxt-link>
                  </h2>
                  <p class="home-portfolio-item-information-description">{{ work.description }}</p>
                  <div class="home-portfolio-item-information-stack-items">
                    <div v-for="(stackItem,key) in work.stack" :key="key" class="home-portfolio-item-information-stack-item">{{ stackItem.value }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="home-about-me-container">
          <div class="home-about-me">
            <h1 class="home-about-me-title">{{ $t('home.about_me_title')}}</h1>
            <p class="home-about-me-content">{{ about.content }}</p>
          </div>
        </div>

        <div class="home-blog-container">
          <div class="home-blog">
            <h1 class="home-blog-title">{{ $t('home.blog_title')}}</h1>
            <div class="home-blog-items">
              <div class="home-blog-item" v-for="(post,postKey) in posts" :key="postKey" @click="navigateToBlogPost(post)">
                  <div class="home-blog-item-thumbnail-container"  :style="`background-image: url('${blogPostImagePath(post)}')`">
                  
                  </div>
                  <h2 class="home-blog-item-title">
                    <nuxt-link :to="localePath({ name: 'blog-slug', params: { slug: post.slug } })" class="home-blog-item-link">{{ post.title }}</nuxt-link>
                  </h2>
                  
              </div>
            </div>
          </div>
        </div>

        <div class="home-resume-container">
          <div class="home-resume">
            <h1 class="home-resume-title">{{ $t('home.resume_title')}}</h1>
            <p class="home-resume-subtitle">Mes expériences</p>
            <div class="home-resume-items">
              <div class="home-resume-item" v-for="(experience,experienceKey) in experiences" :key="experienceKey">
                <div class="home-resume-item-left">
                  <a :href="experience.companyLink" :title="experience.companyTitle" target="_blank">
                    <img class="home-resume-item-company-logo" :src="companyLogoPath(experience)" />
                  </a>
                </div>
                <div class="home-resume-item-right">
                  <div class="home-resume-item-title">{{ experience.title }}</div>
                  <div class="home-resume-item-date">{{ experience.from }}<span v-if="experience.to"> to {{ experience.to }}</span></div>
                  <div class="home-resume-item-description content" v-html="experience.description"></div>
                  <div class="home-resume-item-stack-items">
                    <div v-for="(stackItem,key) in experience.stack" :key="key" class="home-resume-item-stack-item">{{ stackItem.value }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  head: {
    bodyAttrs: {
      class: 'home'
    }
  },
  data() {
    return {
      stack: [
        {
          title: 'PHP',
          link: 'https://www.php.net/',
          logo: require('@/assets/img/logo-php.png')
        },
        {
          title: 'Nuxt.js',
          link: 'https://fr.nuxtjs.org/',
          logo: require('@/assets/img/logo-nuxt.png')
        },
        {
          title: 'Symfony',
          link: 'https://symfony.com/',
          logo: require('@/assets/img/logo-symfony.png')
        },
        {
          title: 'Laravel',
          link: 'https://laravel.com/',
          logo: require('@/assets/img/logo-laravel.png')
        },
        {
          title: 'Cockpit',
          link: 'https://getcockpit.com/',
          logo: require('@/assets/img/logo-cockpit.png')
        },
        {
          title: 'Elasticsearch',
          link: 'https://www.elastic.co/',
          logo: require('@/assets/img/logo-elasticsearch.png')
        }
      ]
    }
  },
  async asyncData ({ app, store }) {
    const locale = store.state.i18n.locale;
    let [homepageResult, aboutResult, experiencesResult, worksResult, blogResult] = await Promise.all([
      app.$axios.post(
        `${process.env.COCKPIT_API_BASE_URL}/singletons/get/Homepage?token=${process.env.COCKPIT_API_KEY}`,
        JSON.stringify({
          lang: locale
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      ),
      app.$axios.post(
        `${process.env.COCKPIT_API_BASE_URL}/singletons/get/About?token=${process.env.COCKPIT_API_KEY}`,
        JSON.stringify({
          lang: locale
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      ),
      app.$axios.post(
        `${process.env.COCKPIT_API_BASE_URL}/collections/get/Experiences?token=${process.env.COCKPIT_API_KEY}`,
        JSON.stringify({
          sort: { from: -1 },
          lang: locale
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      ),
      app.$axios.post(
        `${process.env.COCKPIT_API_BASE_URL}/collections/get/Portfolio?token=${process.env.COCKPIT_API_KEY}`,
        JSON.stringify({
          sort: { date: -1 },
          lang: locale
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      ),
      app.$axios.post(
        `${process.env.COCKPIT_API_BASE_URL}/collections/get/Blog?token=${process.env.COCKPIT_API_KEY}`,
        JSON.stringify({
          sort: { date: -1 },
          lang: locale
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
    ])

    return {
      homepage: homepageResult.data,
      about: aboutResult.data,
      experiences: experiencesResult.data.entries,
      works: worksResult.data.entries,
      posts: blogResult.data.entries,
    };
  },
  methods: {
    companyLogoPath(experience) {
      return `${process.env.COCKPIT_ASSETS_BASE_URL}/${experience.companyLogo.path}`
    },
    workImagePath(work) {
      return `${process.env.COCKPIT_ASSETS_BASE_URL}/${work.image.path}`
    },
    blogPostImagePath(post) {
      return `${process.env.COCKPIT_ASSETS_BASE_URL}/${post.image.path}`
    },
    navigateToWork(work) {
      this.$router.push(this.localePath({ name: 'work-slug', params: { slug: work.slug } }))
    },
    navigateToBlogPost(post) {
      this.$router.push(this.localePath({ name: 'blog-slug', params: { slug: post.slug } }))
    }
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
  },

  mounted() {
    this.$store.commit('setLayoutClass', 'home')
  }
}
</script>