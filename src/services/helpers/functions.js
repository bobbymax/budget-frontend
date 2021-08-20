import { ToWords } from 'to-words'
import moment from 'moment'

const toWords = new ToWords({
    localeCode: 'en-NG',
    converterOptions: {
        currency: true,
        ignoreDecimal: false,
        ignoreZeroCurrency: false
    }
})

export const levelOptions = (optionsArr) => {
    const arr = []
    if(optionsArr.length !== 0) {
        optionsArr.forEach(el => {
            arr.push({value: el.id, label: el.code})
        });
    } else {
        arr.push({ value: 0, label: 'Select Grade Level' })
    }
    return arr
}

export const filterDepts = (deptOptions) => {
    const arr = []
    if(deptOptions.length !== 0) {
        deptOptions.forEach(el => {
            arr.push({value: el.id, label: el.name})
        })
    } else {
        arr.push({value: 0, label: 'Select Departments'})
    }

    return arr
}

export const priceOptions = (wageArr) => {
    const arr = []

    if(wageArr.length !== 0) {
        wageArr.forEach(el => {
            arr.push({value: el.id, label: el.amount})
        })
    } else {
        arr.push({ value: 0, label: 'Nothing is Here' })
    }

    return arr
}

export const customTheme = theme => {
    return {
        ...theme,
        colors: {
            ...theme.colors,
            primary25: 'orange',
            primary: 'green'
        }
    }
}

export const filterByRef = (arr1, arr2) => {
    let res = [];

    res = arr1.filter(el => {
        return !arr2.find(element => {
            return element.grade_level_id === el.value
        })
    })

    return res
}

export const verifyNumOfDays = (started, ended) => {
    const date1 = new Date(started)
    const date2 = new Date(ended)
    const diffTime = Math.abs(date2 - date1)

    
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const amountToWords = amount => {
    return toWords.convert(amount)
}

export const formatDate = date => {
    return moment(date).format('DD-MMM-YY')
}

export const uniqueNumberGenerator = (str) => {
    const paymentType = str === "staff-payment" ? 'SP' : 'TPP'
    return paymentType + Math.floor(Math.random() * 100000)
}

export const getPaymentType = code => {
    const type = code.substring(0, 2)
    return type === "SP" ? "STAFF PAYMENT" : "THIRD PARTY PAYMENT"
}