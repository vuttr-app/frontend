import React from 'react'

import Tool from '@/components/Tool'

export default class Tools extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      criterio: '',
      tags: false
    }
  }

  onToolRemove = (e) => {
    this.props.onRemove(e)
  }

  onCriterioKeyUp = (e) => {
    this.setState({ criterio: e.target.value })
  }

  onTagsClick = () => {
    const tags = !this.state.tags
    this.setState({ tags })
  }

  onAddClick = () => {
    this.props.onAdd()
  }

  render () {
    const criterio = this.state.criterio.trim()
    const tags = this.state.tags
    const tools = this.props.tools
      .filter(tool => {
        return criterio === '' ||
          (!tags && tool.title.includes(criterio)) ||
          (tags && tool.tags.some((tag) => tag.includes(criterio)))
      })
      .map((tool, index) =>
        <Tool tool={tool} key={index} onRemove={this.onToolRemove}/>
      )
    return (
      <div>
        <input
          type='text'
          data-input='criterio'
          onKeyUp={this.onCriterioKeyUp}
        />
        <input
          type='checkbox'
          data-input='tags'
          onClick={this.onTagsClick}
        />
        <button action-trigger='nova' onClick={this.onAddClick}>Add</button>
        {tools}
      </div>
    )
  }
}

