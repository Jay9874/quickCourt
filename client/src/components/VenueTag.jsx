import React from 'react'

export default function VenueTag ({ tag }) {
  return (
    <div className='border border-1 rounded-md p-1'>
      <span>{tag.icon}</span>
      <span>{tag.tag}</span>
    </div>
  )
}
