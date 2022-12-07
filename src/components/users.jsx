import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (usersId) => {
    setUsers(users.filter((el) => el._id !== usersId))
  }

  const renderPhrase = (number) => {
    const text =
      number >= 1
        ? `${number} человек тусанет с тобой сегодня`
        : 'Никто с тобой не тусанет'
    return text
  }

  const colorRenderPhrase = () => {
    let classes = 'badge '
    classes += users.length >= 1 ? 'bg-primary' : 'bg-danger' // users.length выдает количество юзиров. Меняем этим условием цвет.
    return classes
  }
  console.log(renderPhrase(users.length))
  return (
    <>
      <h1 className={colorRenderPhrase()}>{renderPhrase(users.length)}</h1>
      {users.length > 0 && ( // {users.length > 0 &&  удаляем таблицу после удаления всех юзеров. > 0 - преводим у будевому значению, убираем "0" после строки. Так же можем поставить "!!" перед users.length вместо > 0. Незабываем возвести всю таблицу в {}.
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качество</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретил, раз</th>
              <th scope="col">Оценка</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((quality) => (
                    <span
                      className={`badge bg-${quality.color} m-2`}
                      key={quality._id}
                    >
                      {quality.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <button
                  key={user._id}
                  className="badge bg-danger m-2"
                  onClick={() => {
                    handleDelete(user._id)
                  }}
                >
                  delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users

// import React, { useState } from 'react'
// // import { useState } from 'react'
// import api from '../api'

// const Users = () => {
//     const[users, setUsers] = useState(api.users.fetchAll())
//     const handleDelete = (usersId) => {
//     }
//     const renderPhrase = (number) => {
//     }
//     return ()
// }

// export default Users
