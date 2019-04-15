import axios from 'axios'

export default {
  getTools () {
    const url = `${process.env.VUE_APP_API}/tools`
    console.log(url)
    return axios.get(url)
      .then(response => Promise.resolve(response.data))
      .catch(errors => Promise.reject(errors))
  }
}
