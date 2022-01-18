export const formatNumber = (x: number | any, digits = 2) => {
    if (typeof x === 'number' && x < 0.01 && x > -0.01) {
        return '0'
    }
    if (isNaN(x) || x === '') {
        return '-'
    }
    return x.toFixed(digits).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}