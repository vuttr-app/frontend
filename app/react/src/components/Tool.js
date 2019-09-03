import React from 'react'

import Tags from '@/components/Tags'

export default class Tool extends React.Component {
  onRemoveClick = () => {
    this.props.onRemove(this.props.tool)
  }

  render () {
    const tool = { ...this.props.tool }
    return (
      <div data-set='ferramenta'>
        <button
          action-trigger='remover'
          onClick={this.onRemoveClick}
        >Remove</button>
        <span data-set='link' href={tool.link}>
          <h4 data-set='title'>{tool.title}</h4>
        </span>
        <p data-set='description'>{tool.description}</p>
        <Tags tags={tool.tags} />
      </div>
    )
  }
}

