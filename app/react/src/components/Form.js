import React from 'react'

export default class Form extends React.Component {
  constructor (props) {
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

  attrKeyUp = (key, e) => {
    const tool = { ...this.state.tool }
    tool[key] = e.target.value
    this.setState({ tool })
  }

  onTitleKeyUp = (e) => {
    this.attrKeyUp('title', e)
  }

  onLinkKeyUp = (e) => {
    this.attrKeyUp('link', e)
  }

  onDescriptionKeyUp = (e) => {
    this.attrKeyUp('description', e)
  }

  onMarcadoresKeyUp = (e) => {
    this.attrKeyUp('marcadores', e)
  }

  onConfirmClick = () => {
    this.props.onConfirm(this.state.tool)
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
          onClick={this.onConfirmClick}
        >Add</button>
      </div>
    )
  }
}
