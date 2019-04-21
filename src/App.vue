<template lang='pug'>
#app
  input(
    data-input='criterio',
    :value='criterio',
    @keyup='changeCriterio($event)'
  )
  button(action-trigger='nova', @click='nova') Nova
  div(data-set='nova-ferramenta', v-if='editando')
    input(
      data-input='title',
      :value='ferramenta.title',
      @change='changeTitle($event)'
    )
    button(action-trigger='adicionar', @click='adicionar') Adicionar
  div(
    v-for='tool of tools',
    data-set='ferramenta'
  )
    span {{ tool.title }}
    button(action-trigger='remover', @click='remover(tool)') Remover
</template>

<script>
import api from '@/services/api'

export default {
  methods: {
    nova () {
      this.ferramenta = {
        title: ''
      }
    },
    changeCriterio (event) {
      this.criterio = event.target.value
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
      const tool = { ...this.ferramenta }
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
        .filter(ferramenta => ferramenta.title.match(re) !== null)
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
      ferramenta: { empty: true },
      ferramentas: []
    }
  }
}
</script>
