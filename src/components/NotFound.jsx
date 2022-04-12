import React from 'react'

export const NotFound = ({ text }) => {
  return (
    <div>{text ? text : 'Not found' }</div>
  )
}

export default NotFound;