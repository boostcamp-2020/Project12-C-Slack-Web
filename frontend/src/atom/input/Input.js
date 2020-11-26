import React from 'react'

function Input({ placeholder, handleChange, handleKey, value }) {
  return (
    <input
      placeholder={placeholder}
      onChange={handleChange}
      onKeyDown={handleKey}
      value={value}
    />
  )
}

export default Input
