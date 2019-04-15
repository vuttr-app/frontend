import axios from 'axios'

export default {
  getTools () {
    const url = 'http://api:4500/api/tools'
    return axios.get(url)
  }
}
