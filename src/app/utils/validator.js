export function validator(data, config) {
    const errors = {}
    function validata(validataMetod, data, config) {
        let statusValidate
        switch (validataMetod) {
            case 'isRequired':
                statusValidate = data.trim() === ''
                break
            case 'isEmail': {
                const emailRegExp = /^\S+@\S+\.\S+$/g
                statusValidate = !emailRegExp.test(data)
                break
            }
            case 'isCapitalSymbol': {
                const capital = /[A-Z]+/g
                statusValidate = !capital.test(data)
                break
            }
            case 'isContainDigit': {
                const number = /\d+/g
                statusValidate = !number.test(data)
                break
            }
            case 'min': {
                statusValidate = data.length < config.value
                break
            }
            default:
                break
        }
        if (statusValidate) return config.message
    }
    for (const fieldName in data) {
        for (const validataMetod in config[fieldName]) {
            const error = validata(
                validataMetod,
                data[fieldName],
                config[fieldName][validataMetod]
            )
            if (error && !errors[fieldName]) {
                errors[fieldName] = error
            }
        }
    }
    return errors
}
