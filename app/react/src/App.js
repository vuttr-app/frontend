import React from 'react'

import '@/App.css'

import api from '@/services/api'

import Tools from '@/components/Tools'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tools: []
    }
  }

  componentDidMount() {
    api.getTools()
      .then(tools => {
        this.setState({ tools })
      })
  }

  render () {
    return (
      <div className='App'>
        <h1>VUTTR</h1>
        <h3>Very Useful Tools to Remember</h3>
        <Tools tools={this.state.tools}/>
      </div>
    )
  }
}

export default App
