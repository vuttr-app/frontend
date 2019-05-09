<template lang='pug'>
#app.container
  .row: .col-sm-10.col-sm-offset-1
      h1 VUTTR
      h3 Very Useful Tools to Remember
  tool-list(:ferramentas='tools', @remover='remover($event)', @adicionar='nova')
  tool-form(
    v-if='aberto',
    :aberto='aberto',
    :tool='ferramenta',
    @confirmar='adicionar($event)',
    @cancelar='cancelar'
  )
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
        link: '',
        title: '',
        marcadores: '',
        description: ''
      }
      this.aberto = true
    },
    remover (to) {
      api.removeTool(to.id)
        .then(() => {
          this.ferramentas = this.ferramentas
            .filter(ferramenta => ferramenta.id !== to.id)
        })
    },
    cancelar () {
      this.aberto = false
    },
    adicionar (ferramenta) {
      const tags = (ferramenta.marcadores || '').split(' ')
      let tool = { ...ferramenta, tags }
      delete tool.marcadores
      api.createTool(tool)
        .then(response => {
          this.ferramentas = [ ...this.ferramentas, { ...response } ]
          this.aberto = false
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
      aberto: false,
      ferramenta: {},
      ferramentas: []
    }
  },
  computed: {
    tools () {
      return this.ferramentas.map((ferramenta, index) => {
        return { ...ferramenta, index }
      })
    }
  }
}
</script>
