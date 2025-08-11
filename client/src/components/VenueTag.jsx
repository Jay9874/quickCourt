import React from 'react'

export default function VenueTag ({ tag }) {
  return (
    <div>
      <span>{tag.icon}</span>
      <span>{tag.tag}</span>
    </div>
  )
}
