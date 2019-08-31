import React from 'react'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tool: {
        title: '',
        link: '',
        description: '',
        marcadores: ''
      }
    }
  }

  onTitleKeyUp = (e) => {
    const before = this.state.tool
    const title = e.target.value
    const tool = { ...before, title }
    this.setState({ tool })
  }

  onLinkKeyUp = (e) => {
    const before = this.state.tool
    const link = e.target.value
    const tool = { ...before, link }
    this.setState({ tool })
  }

  onDescriptionKeyUp = (e) => {
    const before = this.state.tool
    const description = e.target.value
    const tool = { ...before, description }
    this.setState({ tool })
  }

  onMarcadoresKeyUp = (e) => {
    const before = this.state.tool
    const marcadores = e.target.value
    const tool = { ...before, marcadores }
    this.setState({ tool })
  }

  onAdicionarClick = () => {
    this.props.onAdicionar(this.state.tool)
  }

  render () {
    return(
      this.props.show &&
      <div>
        <input
          type='text'
          data-input='title'
          onKeyUp={this.onTitleKeyUp}
        />
        <input
          type='text'
          data-input='link'
          onKeyUp={this.onLinkKeyUp}
        />
        <input
          type='text'
          data-input='description'
          onKeyUp={this.onDescriptionKeyUp}
        />
        <input
          type='text'
          data-input='marcadores'
          onKeyUp={this.onMarcadoresKeyUp}
        />
        <button
          action-trigger='adicionar'
          onClick={this.onAdicionarClick}
        >Add</button>
      </div>
    )
  }
}
