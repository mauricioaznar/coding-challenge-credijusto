import React from 'react'
import './CryptoRates.css'
import {Rates} from "../../../types/rates";
import {RatesWithDate} from "../../../types/rates-with-date";
import {formatNumber} from "../../../helpers/number-format";

interface CryptoRatesProps {
    rates: Array<RatesWithDate>;
    name: string;
    currentCrypto: keyof Rates;
    className?: string;
}

export default function CryptoRates (props: CryptoRatesProps) {
    const {
        rates,
        name,
        currentCrypto,
        className = ''
    } = props

    let filteredRates = rates.length < 7
        ? rates
        : rates.slice(0, 6)


    const firstRate = filteredRates[0]?.[currentCrypto] | 0
    const secondRate = filteredRates[1]?.[currentCrypto] | 0

    const cryptoChange = filteredRates.length >= 2 ?
        (firstRate > secondRate ? 'up' : 'down') : 'neutral'

    return (
        <div className={`crypto-rates ${className}`}>
            <div className={'crypto-rates_header p-4'}>

                <h3 className={'mb-1'}>
                    { name }
                </h3>

                <p>
                    {
                        cryptoChange === 'up'
                            ? <span className={'green'}>
                                &#8593;
                            </span>
                        : cryptoChange === 'down'
                            ? <span className={'red'}>
                                &#8595;
                            </span>
                        : cryptoChange === 'neutral'
                            ? <span>
                                &#8722;
                            </span>
                        : null
                    }
                    <span>
                        { ` ${currentCrypto.toLocaleUpperCase()} ` }
                    </span>
                    <span className={'font-bold ml-2'}>
                        {
                            formatNumber(rates[0]?.[currentCrypto], 2)
                        } MXN
                    </span>
                </p>


            </div>
            <ul className={'p-4'}>
                {
                    filteredRates
                        .map((r, index) => {
                            return (
                                <li key={index} className={'crypto-rates_list-item'}>
                                    <span>
                                        { r['date'] }
                                    </span>
                                    <span className={'font-bold'}>
                                        {  ' - ' + formatNumber(r[currentCrypto], 2) }
                                    </span>
                                </li>
                            )
                        })
                }
            </ul>
        </div>
    )

}
