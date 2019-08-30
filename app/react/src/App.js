import React from 'react'

import '@/App.css'

import api from '@/services/api'

import Tools from '@/components/Tools'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tools: [],
      criterio: '',
      tags: false
    }
  }

  componentDidMount() {
    api.getTools()
      .then(tools => {
        this.setState({ tools })
      })
  }

  onKeyUpHandler(e) {
    this.setState({
      criterio: e.target.value
    })
  }

  onClickHandler(e) {
    const newValue = !this.state.tags
    this.setState({
      tags: newValue
    })
  }

  render () {
    const criterio = this.state.criterio.trim()
    const tags = this.state.tags
    const tools = this.state.tools
      .filter(tool => {
        return criterio === '' ||
          (!tags && tool.title.includes(criterio)) ||
          (tags && tool.tags.some((tag) => tag.includes(criterio)))
      })
    return (
      <div className='App'>
        <h1>VUTTR</h1>
        <h3>Very Useful Tools to Remember</h3>
        <input
          type='text'
          data-input='criterio'
          onKeyUp={this.onKeyUpHandler.bind(this)}
        />
        <input
          type='checkbox'
          data-input='tags'
          onClick={this.onClickHandler.bind(this)}
        />
        <Tools tools={tools}/>
      </div>
    )
  }
}

export default App
