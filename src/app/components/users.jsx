import React from 'react'
import User from './user'
const Users = ({ users, ...rest }) => {
  return (
    <>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User {...rest} {...user} /> // Добавляем в таблицу с помощью рест объект из кнопки удалить и избранное. А с помощью юзер всех пользователей. С помощью мап перебераем массив с пользователями и создаем отдельный массив для каждого пользователя.
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users
