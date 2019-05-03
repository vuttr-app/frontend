<template lang='pug'>
div
  .row: .col-sm-10.col-sm-offset-1: .row
        .col-sm-6.form-inline
          .inner-addon.left-addon
            i.glyphicon.glyphicon-search
            input.form-control.criterio(
              placeholder='search',
              data-input='criterio',
              :value='criterio',
              @keyup='changeCriterio($event)'
            )
        .col-sm-4.form-inline
          .checkbox
            label
              input.form-control(
                type='checkbox',
                data-input='tags',
                :checked='tags',
                @click='toggleTags'
              )
              | search in tags only
        .col-sm-2
          button.btn.btn-default.btn-md.pull-right(
            action-trigger='nova',
            @click=`$emit('adicionar')`
          )
            span.glyphicon.glyphicon-plus(aria-hidden='true')
            |  Add
  tool-line(
    v-for='tool of tools',
    :key='tool.index',
    :tool='tool',
    @remover='remover(tool)',
    data-set='ferramenta'
  )
</template>

<script>
import ToolLine from '@/components/Line'

export default {
  components: { ToolLine },
  props: ['ferramentas'],
  data () {
    return {
      criterio: '',
      tags: false
    }
  },
  methods: {
    toggleTags () {
      this.tags = !this.tags
    },
    changeCriterio (event) {
      this.criterio = event.target.value
    },
    remover (to) {
      this.$confirm({
        title: 'x Remove tool',
        content: `Are you sure you want to remove <strong>${to.title}</strong>?`,
        html: true,
        size: 'lg',
        okText: 'Yes, remove',
        cancelText: 'Cancel',
        customClass: 'data-set-confirm'
      })
        .then(() => {
          this.$emit('remover', to)
        })
    }
  },
  computed: {
    tools () {
      const re = new RegExp(this.criterio)
      const result = this.criterio && this.criterio.trim().length > 0
        ? this.ferramentas.filter(ferramenta => {
          return !this.tags
            ? ferramenta.title.match(re) !== null
            : ferramenta.tags.some(tag => tag.match(re) !== null)
        })
        : this.ferramentas
      return result
    }
  }
}
</script>
