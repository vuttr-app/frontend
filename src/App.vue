<template lang='pug'>
#app
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
  div(data-set='nova-ferramenta', v-if='editando')
    input(
      data-input='title',
      :value='ferramenta.title',
      @change='changeTitle($event)'
    )
    input(
      data-input='link',
      :value='ferramenta.link',
      @change='changeLink($event)'
    )
    input(
      data-input='description',
      :value='ferramenta.description',
      @change='changeDescription($event)'
    )
    input(
      data-input='marcadores',
      :value='ferramenta.marcadores',
      @change='changeMarcadores($event)'
    )
    button(action-trigger='adicionar', @click='adicionar') Adicionar
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

export default {
	components: { ToolLine },
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
    changeMarcadores (event) {
      this.ferramenta.marcadores = event.target.value
    },
    changeDescription (event) {
      this.ferramenta.description = event.target.value
    },
    changeLink (event) {
      this.ferramenta.link = event.target.value
    },
    changeTitle (event) {
      this.ferramenta.title = event.target.value
    },
    remover (to) {
      api.removeTool(to.id)
        .then(_ => {
          this.ferramentas = this.ferramentas
            .filter(ferramenta => ferramenta.id !== to.id)
        })
    },
    adicionar () {
      const tags = (this.ferramenta.marcadores || '').split(' ')
      let tool = { ...this.ferramenta, tags }
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
