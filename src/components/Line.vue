<template lang='pug'>
.row(data-set='ferramenta'): .col-sm-10.col-sm-offset-1: .panel.panel-default
  .row
    .col-sm-10
      span(data-set='link', :href='tool.link')
        h4(data-set='title') {{ tool.title }}
    .col-sm-2
      button.pull-right(
        action-trigger='remover',
        @click='remover(tool)'
      ) Remover
  .row: .col-sm-12
      p(data-set='description') {{ tool.description }}
  .row: .col-sm-12(data-set='tags')
      strong(v-for='tag in tool.tags') {{ `#${tag} ` }}
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
