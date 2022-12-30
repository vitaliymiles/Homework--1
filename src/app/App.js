import React, { useState } from 'react'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import api from './api'

function App() {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }
  const handleToggleBookMark = (id) => {
    setUsers(
      users.filter((user) => {
        if (user._id === id) {
          user.bookmark = !user.bookmark
          return user
        } //Перебрав массив с объектами я обращаюсь к id объекта и ставлю условие, если айди равен моему нажатию на избранное он подтягивает id на тот объект который нажал. То тогда поменяй статус с фолз на тру и соответственно значек картинки. Это булевое значение. Потом верни обновленный объект.

        return user
      })
    )
  }

  return (
    <div>
      <SearchStatus length={users.length} />
      <Users
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
        users={users} // Все методы, которые мы передаем внутрь компонентов должны начинаться с on...
      />
    </div>
  )
}

export default App
