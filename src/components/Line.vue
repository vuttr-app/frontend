<template lang='pug'>
div(data-set='ferramenta')
  a(data-set='link', :href='tool.link')
    h4(data-set='title') {{ tool.title }}
  button(action-trigger='remover', @click='remover(tool)') Remover
  p(data-set='description') {{ tool.description }}
  ul(data-set='tags')
    li(v-for='tag in tool.tags') {{ tag }}
</template>

<script>
export default {
  props: ['tool'],
  methods: {
    remover (to) {
      this.$emit('remover', to)
    }
  }
}
</script>
