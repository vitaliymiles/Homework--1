export function displayDate(data) {
    const date = new Date(parseInt(data)) // Преобразование строки в число.
    const dateNow = new Date()
    const yearDir = dateNow.getFullYear() - date.getFullYear() // Сверка в разнице в годах

    if (yearDir === 0) {
        const dayDir = dateNow.getDay() - date.getDate()
        if (dayDir === 0) {
            const hourDir = dateNow.getHours() - date.getHours()
            if (hourDir === 0) {
                const minutesDir = dateNow.getMinutes() - date.getMinutes()
                if (minutesDir >= 0 && minutesDir < 5) return '1 минуту назад'
                if (minutesDir >= 5 && minutesDir < 10) return '5 минуту назад'
                if (minutesDir >= 10 && minutesDir < 30) {
                    return '10 минут назад'
                }
                return '30 минут назад'
            }
            return `${date.getHours()}:${date.getMinutes()}`
        }
        return `${date.getDay()} ${date.toLocaleString('default', {
            month: 'long'
        })}`
    }
    return (
        date.getFullYear() + '.' + (date.getMonth() + 1) + '_' + date.getDate()
    )
}
// если разницы в годах нету то мы идем дальше по условию в противном отображаем дату. И так сравниваем по дням часам и минутам выводя на каждый вариант свой ответ. После перезагрузки идет обновление даты и сравнение по условиям.
