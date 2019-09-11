import React from 'react'

import '@/App.css'
import Confirm from '@/services/Confirm'
import api from '@/services/api'
import Tools from '@/components/Tools'
import Form from '@/components/Form'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tools: [],
      show: false
    }
  }

  componentDidMount() {
    api.getTools()
      .then(tools => {
        this.setState({ tools })
      })
  }

  onFormConfirm = (e) => {
    const tags = (e.marcadores || '').split(' ')
    const tool = { ...e, tags }
    delete tool.marcadores
    api.createTool(tool)
      .then(tool => {
        const before = this.state.tools
        const after = [ ...before, tool ]
        this.setState({ tools: after, show: false })
      })
  }

  onToolRemove = (tool) => {
    Confirm.show({
      title: 'Remove Tool',
      body: 'Are you sure remove tool?',
      okText: 'Yes, remove'
    })
      .then(result => {
        if (result) {
          api.removeTool(tool.id)
            .then(() => {
              const before = this.state.tools
              const after = before.filter(t => t.id !== tool.id)
              this.setState({ tools: after })
            })
        }
      })
  }

  onToolAdd = () => {
    this.setState({ show: true })
  }

  render () {
    const { show, tools } = this.state
    return (
      <div className='App'>
        <h1>VUTTR</h1>
        <h3>Very Useful Tools to Remember</h3>
        <Tools
          tools={tools}
          onRemove={this.onToolRemove}
          onAdd={this.onToolAdd}
        />
        <Form show={show} onConfirm={this.onFormConfirm}/>
      </div>
    )
  }
}

