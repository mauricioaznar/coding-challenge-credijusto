import {Rates} from "../../../types/rates";
import {RatesWithDate} from "../../../types/rates-with-date";

interface CryptoRatesProps {
    rates: Array<RatesWithDate>;
    name: string;
    currentCrypto: keyof Rates;
}

export default function CryptoRates (props: CryptoRatesProps) {
    const {
        rates,
        name,
        currentCrypto
    } = props

    let filteredRates = rates.length < 7
        ? rates
        : rates.slice(0, 6)


    const firstRate = filteredRates[0]?.[currentCrypto] | 0
    const secondRate = filteredRates[1]?.[currentCrypto] | 0

    const cryptoChange = filteredRates.length >= 2 ?
        (firstRate > secondRate ? 'up' : 'down') : 'neutral'

    return (
        <div>
            <div>

                <p>
                    {
                        cryptoChange === 'up'
                            ? <span>
                                &#8593;
                            </span>
                        : cryptoChange === 'down'
                            ? <span>
                                &#8595;
                            </span>
                        : cryptoChange === 'neutral'
                            ? <span>
                                &#8722;
                            </span>
                        : null
                    }
                    <span>
                        { '  ' + currentCrypto.toLocaleUpperCase() }
                    </span>
                </p>
                <h3>
                    { name }
                </h3>

            </div>
            <ul>
                {
                    filteredRates
                        .map((r, index) => {
                            return (
                                <li key={index}>
                                    <span>
                                        { r['date'] }
                                    </span>
                                    <span>
                                        {  '  ' + r[currentCrypto] }
                                    </span>
                                </li>
                            )
                        })
                }
            </ul>
        </div>
    )

}
