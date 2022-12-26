import React from 'react'

const BookMark = ({ status, ...rest }) => {
  return status === { ...rest } ? (
    <i class="bi bi-star"></i>
  ) : (
    <i class="bi bi-star-fill"></i>
  )
}

export default BookMark
