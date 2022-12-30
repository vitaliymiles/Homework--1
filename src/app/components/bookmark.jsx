import React from 'react'

const BookMark = ({ status, onToggleBookMark, _id }) => {
  return (
    <i
      onClick={() => onToggleBookMark(_id)}
      class={status ? 'bi bi-star-fill' : 'bi bi-star'}
    ></i>
  )
}

export default BookMark
