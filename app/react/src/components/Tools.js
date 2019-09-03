import React from 'react'

import Tool from '@/components/Tool'

export default class Tools extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      criterio: '',
      tags: false
    }
  }

  onRemover = (e) => {
    this.props.onRemover(e)
  }

  onCriterioKeyUp = (e) => {
    this.setState({ criterio: e.target.value })
  }

  onTagsClick = () => {
    const tags = !this.state.tags
    this.setState({ tags })
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
        <Tool tool={tool} key={index} onRemover={this.onRemover}/>
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
        {tools}
      </div>
    )
  }
}

