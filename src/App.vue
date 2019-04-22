<template lang='pug'>
#app
  tool-form(
    v-if='editando',
    :tool='ferramenta',
    @confirmar='adicionar($event)'
  )
  button(action-trigger='nova', @click='nova') Nova
  tool-list(:ferramentas='ferramentas', @remover='remover($event)')
</template>

<script>
import api from '@/services/api'
import ToolList from '@/components/List'
import ToolForm from '@/components/Form'

export default {
  components: { ToolList, ToolForm },
  methods: {
    nova () {
      this.ferramenta = {
        title: ''
      }
    },
    remover (to) {
      api.removeTool(to.id)
        .then(_ => {
          this.ferramentas = this.ferramentas
            .filter(ferramenta => ferramenta.id !== to.id)
        })
    },
    adicionar (ferramenta) {
      const tags = (ferramenta.marcadores || '').split(' ')
      let tool = { ...ferramenta, tags }
      delete tool.marcadores
      api.createTool(tool)
        .then(response => {
          this.ferramentas = [ ...this.ferramentas, { ...response } ]
          this.ferramenta = { empty: true }
        })
    }
  },
  computed: {
    editando () {
      return !this.ferramenta.empty
    }
  },
  created () {
    api.getTools()
      .then(response => {
        this.ferramentas = response
      })
  },
  data () {
    return {
      ferramenta: { empty: true },
      ferramentas: []
    }
  }
}
</script>
