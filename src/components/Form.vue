<template lang='pug'>
modal(
  data-set='nova-ferramenta',
  v-model='open',
  title='+ Add new tool',
  :dismiss-btn='false',
  :footer='false',
  @hide='cancelar'
)
  fieldset.form-group
    label Tool Name
    input.form-control(
      data-input='title',
      :value='ferramenta.title',
      @change='changeTitle($event)'
    )
  fieldset.form-group
    label Tool Link
    input.form-control(
      data-input='link',
      :value='ferramenta.link',
      @change='changeLink($event)'
    )
  fieldset.form-group
    label Tool Description
    textarea.form-control(
      data-input='description',
      rows='5',
      :value='ferramenta.description',
      @change='changeDescription($event)'
    )
  fieldset.form-group
    label Tags
    input.form-control(
      data-input='marcadores',
      :value='ferramenta.marcadores',
      @change='changeMarcadores($event)'
    )
  fieldset.form-group
    button.pull-right(action-trigger='adicionar', @click='adicionar') Add tool
</template>

<script>
export default {
  props: {
    tool: { type: Object, required: true },
    aberto: { type: Boolean, default: false }
  },
  data () {
    return {
      ferramenta: {},
      open: false
    }
  },
  created () {
    this.ferramenta = this.tool
    this.open = this.aberto
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
    cancelar () {
      this.$emit('cancelar')
    },
    adicionar () {
      this.$emit('confirmar', this.ferramenta)
    }
  }
}
</script>
