import {formatNumber} from "./number-format";


it('Returns a formatted number with 2 digits', () => {
    const formattedNumber = formatNumber(2000.0111111)
    expect(formattedNumber).toBe('2,000.01')
})

it('Returns a hyphen if parameter is not a number', () => {
    const formattedNumber = formatNumber('')
    expect(formattedNumber).toBe('-')
})

it('returns 0 if 0.001 or -0.0001', () => {
    const formattedNumber = formatNumber(0.001)
    expect(formattedNumber).toBe('0')
    const formattedNumber2 = formatNumber(-0.001)
    expect(formattedNumber2).toBe('0')
})