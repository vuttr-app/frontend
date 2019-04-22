<template lang='pug'>
div(data-set='nova-ferramenta')
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
</template>

<script>
export default {
  props: ['tool'],
  created () {
    this.ferramenta = this.tool
  },
  data () {
    return {
      ferramenta: {}
    }
  },
  methods: {
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
    adicionar () {
      this.$emit('confirmar', this.ferramenta)
    }
  }
}
</script>
