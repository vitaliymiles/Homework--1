import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/pagination'
import api from '../../../api'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UserTable from '../../ui/usersTable'
import _ from 'lodash'
import TextField from '../../common/form/textField'
const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1) // первая страница пагинации
    const [professions, setProfession] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [nameRequest, setnameRequest] = useState('') // пустая строка в поисковой форме.
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const pageSize = 8

    const [users, setUsers] = useState()
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark }
            }
            return user
        })
        setUsers(newArray)
    }

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const handleProfessionSelect = (item) => {
        if (nameRequest !== '') setnameRequest('')
        // Очищает форму поиска при нажатии на поиск по профессии.
        setSelectedProf(item)
    }
    const handleChange = ({ target }) => {
        setSelectedProf(undefined)
        // Отчищает фильтр по профессии при вводе новых даных в форму поиска.
        setnameRequest(target.value)
    }
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }
    const handleSort = (item) => {
        setSortBy(item)
    }

    if (users) {
        const filteredUsers = nameRequest
            ? users.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(nameRequest.toLowerCase()) !== -1
              )
            : selectedProf // Сам метод поиска. toLowerCase возвращает в нижнем регистре поступающие данные и имена для лучшего поиска. indexOf находит первые совпадающие символы. В случае если нет поиска возвращается исходная таблица.
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users

        const count = filteredUsers.length
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        )
        const usersCrop = paginate(sortedUsers, currentPage, pageSize)
        const clearFilter = () => {
            setSelectedProf()
        }

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {' '}
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <form action="">
                        <TextField
                            placeholder="Search..."
                            name="search"
                            value={nameRequest}
                            onChange={handleChange}
                        />
                    </form>
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return 'loading...'
}
UsersListPage.propTypes = {
    users: PropTypes.array
}

export default UsersListPage