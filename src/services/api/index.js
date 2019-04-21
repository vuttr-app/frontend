import axios from 'axios'

export default {
  removeTool (id) {
    const url = `${process.env.VUE_APP_API}/tools/${id}`
    return axios.delete(url)
      .then(response => Promise.resolve(response.data))
      .catch(errors => Promise.reject(errors))
  },
  createTool (tool) {
    const url = `${process.env.VUE_APP_API}/tools`
    return axios.post(url, tool)
      .then(response => Promise.resolve(response.data))
      .catch(errors => Promise.reject(errors))
  },
  getTools () {
    const url = `${process.env.VUE_APP_API}/tools`
    return axios.get(url)
      .then(response => Promise.resolve(response.data))
      .catch(errors => Promise.reject(errors))
  }
}
