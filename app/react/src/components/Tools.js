import React from 'react'

import Tool from '@/components/Tool'

export default class Tools extends React.Component {
  onRemover = (e) => {
    this.props.onRemover(e)
  }

  render () {
    const tools = this.props.tools.map((tool, index) =>
      <Tool tool={tool} key={index} onRemover={this.onRemover}/>
    )
    return (
      <div>{tools}</div>
    )
  }
}

