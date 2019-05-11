import React from 'react'

import Tags from '@/components/Tags'

const Tool = (props) => {
  const tool = { ...props.tool }
  return (
    <div data-set='ferramenta'>
      <span data-set='link' href={tool.link}>
        <h4 data-set='title'>{tool.title}</h4>
      </span>
      <p data-set='description'>{tool.description}</p>
      <Tags tags={tool.tags} />
    </div>
  )
}

export default Tool
