export const state = () => ({
  layoutClass: '',
  blogPostSlugs: {}
})

export const mutations = {
  setLayoutClass(state, layoutClass) {
    state.layoutClass = layoutClass
  },

  setBlogPostSlugs(state, blogPostSlugs) {
    state.blogPostSlugs = blogPostSlugs
  }
}

export const actions = {
  nuxtServerInit({ commit, context }, { req, app }) {
    const routeName = app.context.route.name
    let layoutClass = ''
    if (routeName.match(/^index/)) {
      layoutClass = 'home'
    } else if (routeName.match(/^index/)) {
      layoutClass = 'home'
    } else if (routeName.match(/^work/)) {
      layoutClass = 'works'
    } else if (routeName.match(/^work-slug/)) {
      layoutClass = 'work'
    } else if (routeName.match(/^contact/)) {
      layoutClass = 'contact'
    }
    commit('setLayoutClass', layoutClass)
  }
}
