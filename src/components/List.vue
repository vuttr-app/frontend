<template lang='pug'>
div
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
				title: 'Remover ferramenta',
				content: 'Você tem certeza que deseja remover esta ferramenta?',
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
