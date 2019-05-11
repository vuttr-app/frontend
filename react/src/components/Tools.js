import React from 'react'

import Tool from '@/components/Tool'

const Tools = (props) => {
  const tools = props.tools.map(tool =>
    <Tool tool={tool} key={tool.toString()}/>
  )
  return (
    <div>{tools}</div>
  )
}

export default Tools
