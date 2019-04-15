<template lang='pug'>
#app
  div(
    v-for='ferramenta of ferramentas',
    data-set='ferramenta'
  ) {{ ferramenta.title }}
</template>

<script>
import api from '@/services/api'

export default {
  created () {
    api.getTools()
      .then(response => {
        this.ferramentas = response
      })
  },
  data () {
    return {
      ferramentas: []
    }
  }
}
</script>
