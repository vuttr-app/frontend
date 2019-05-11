import React from 'react'

import Tag from '@/components/Tag'

const Tags = (props) => {
  const tags = props.tags.map(tag =>
    <Tag tag={tag} key={tag.toString()}/>
  )
  return (
    <div data-set='tags'>{tags}</div>
  )
}

export default Tags
