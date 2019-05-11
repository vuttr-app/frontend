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
        <Tools tools={this.state.tools}/>
      </div>
    )
  }
}

export default App
