import React from 'react'
import Qualitie from './qualitie'
import BookMark from './bookmark'
const User = ({
  _id,
  name,
  profession,
  qualities,
  completedMeetings,
  rate,
  bookmark,
  onToggleBookMark,
  onDelete,
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((item) => (
          <Qualitie {...item} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <BookMark status={bookmark} onClick={() => onToggleBookMark(_id)} />
      </td>
      <tb>
        <button onClick={() => onDelete(_id)} className="btn btn-danger">
          Delete
        </button>
      </tb>
    </tr>
  )
}

export default User
