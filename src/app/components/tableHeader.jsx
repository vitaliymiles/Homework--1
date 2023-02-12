import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ onSort, selectedSort, columns }) => {
    console.log('TableHeader', selectedSort)
    const caretSort = (selectedSort, currentPath) => {
        if (selectedSort.path !== currentPath) {
            return false
        }

        if (selectedSort.order === 'asc') {
            return 'up'
        } else {
            return 'down'
        }
    }
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === 'asc' ? 'desc' : 'asc'
            }) // Фильтрация списка по направлениям.
        } else {
            onSort({ path: item, order: 'asc' })
        }
    }

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && 'button' }}
                        scope="col"
                    >
                        <span className="pe-2">{columns[column].name}</span>

                        <i
                            className={`bi bi-caret-${caretSort(
                                selectedSort,
                                columns[column].path
                            )}-fill`}
                        ></i>
                    </th> // Динамическое отображение таблицы.
                ))}
            </tr>
        </thead>
    )
}

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
}

export default TableHeader
