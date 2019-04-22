<template lang='pug'>
#app
  tool-form(
    v-if='editando',
    :tool='ferramenta',
    @confirmar='adicionar($event)'
  )
  input(
    data-input='criterio',
    :value='criterio',
    @keyup='changeCriterio($event)'
  )
  input(
    type='checkbox',
    data-input='tags',
    :checked='tags',
    @click='toggleTags'
  )
  button(action-trigger='nova', @click='nova') Nova
  tool-line(
		v-for='tool of tools',
		:tool='tool',
		@remover='remover($event)',
		data-set='ferramenta'
  )
</template>

<script>
import api from '@/services/api'
import ToolLine from '@/components/Line'
import ToolForm from '@/components/Form'

export default {
	components: { ToolLine, ToolForm },
  methods: {
    nova () {
      this.ferramenta = {
        title: ''
      }
    },
    toggleTags () {
      this.tags = !this.tags
    },
    changeCriterio (event) {
      this.criterio = event.target.value
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
    },
    tools () {
      const re = new RegExp(this.criterio)
      return this.ferramentas
        .filter(ferramenta => {
          return !this.tags
            ? ferramenta.title.match(re) !== null
            : ferramenta.tags.some(tag => tag.match(re) !== null)
        })
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
      criterio: '',
      tags: false,
      ferramenta: { empty: true },
      ferramentas: []
    }
  }
}
</script>
