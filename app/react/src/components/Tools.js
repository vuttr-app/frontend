import React from 'react'

import Tool from '@/components/Tool'

const Tools = (props) => {
  const tools = props.tools.map((tool, index) =>
    <Tool tool={tool} key={index}/>
  )
  return (
    <div>{tools}</div>
  )
}

export default Tools
