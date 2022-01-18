import {useTypedSelector} from "../../hooks/redux-hooks/useTypedSelector";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {parseCoinGecko} from "../../helpers/parse-coin-gecko";
import {BASE_COIN_GECKO_URL, BASE_CRYPTO_COMPARE_URL} from "../../helpers/constants";
import {parseCryptoCompare} from "../../helpers/parse-crypto-compare";
import CryptoRates from "./crypto-comparator/CryptoRates";
import {RatesWithDate} from "../../types/rates-with-date";
import CryptoConverter from "./crypto-comparator/CryptoConverter";
import {Rates} from "../../types/rates";

const COUNTDOWN = 15

export default function CryptoComparator() {
    const isMounted = useRef(false);

    const {currentUser} = useTypedSelector((state) => state.auth);
    const [count, setCount] = useState(COUNTDOWN);

    const [coinGeckoRates, setCoinGeckoRates] = useState<Array<RatesWithDate>>([])
    const [cryptoCompareRates, setCryptoCompareRates] = useState<Array<RatesWithDate>>([])

    const buttons: (keyof Rates)[] = ['eth', 'btc', 'xrp']
    const [selectedButton, setSelectedButton] = useState(buttons[0])

    const [error, setError] = useState(false)


    const getCryptoRates = () => {

        Promise.all([
            axios.get(`${BASE_CRYPTO_COMPARE_URL}?fsyms=BTC%2CETH%2CXRP&tsyms=MXN`),
            axios.get(`${BASE_COIN_GECKO_URL}?vs_currency=mxn&ids=bitcoin%2Cethereum%2Cripple`)
        ])
            .then(response => {
                if (isMounted.current) {
                    const [
                        cryptoCompareResponse,
                        coinGeckoResponse
                    ] = response

                    const cryptoCompareRate = parseCryptoCompare(cryptoCompareResponse)
                    setCryptoCompareRates([cryptoCompareRate, ...cryptoCompareRates])
                    const coinGeckoRate = parseCoinGecko(coinGeckoResponse)
                    setCoinGeckoRates([coinGeckoRate, ...coinGeckoRates])
                }

            })
            .catch(_ => {
                if (isMounted.current) {
                    setError(true)
                }
            })
    }

    useEffect(
        () => {
            getCryptoRates()
            isMounted.current = true
            return () => {
                isMounted.current = false
            }
        }, [isMounted])

    useEffect(
        () => {
            if (count <= 0) {
                getCryptoRates()
                setCount(COUNTDOWN)
            }
            const timeout = setTimeout(() => {
                setCount(count - 1)
            }, 1000)
            return () => clearTimeout(timeout);
        }, [count])


    const isLoading = coinGeckoRates.length === 0


    return <div>
            <nav>
                <h2>
                    Crypto comparator
                </h2>

                {
                    buttons.map(l => {
                        return (
                            <button
                                key={l}
                                onClick={() => {
                                    setSelectedButton(l)
                                }}
                            >
                                { l }
                            </button>
                        )
                    })
                }
                <span>
                    {`${currentUser?.firstName} ${currentUser?.lastName}`}
                </span>
            </nav>
            <div>
                {count}
            </div>

            <div>
                {
                    isLoading
                        ? <div>Loading...</div>
                        : <>
                            <CryptoRates rates={coinGeckoRates} name={'Coin gecko'} currentCrypto={selectedButton}/>
                            <CryptoRates rates={cryptoCompareRates} name={'Crypto compare'} currentCrypto={selectedButton}/>
                        </>
                }
            </div>
            <CryptoConverter

                exchangesUpdates={[
                    {
                        rate: coinGeckoRates[0]?.[selectedButton],
                        exchangeName: 'Coin gecko'
                    },
                    {
                        rate: cryptoCompareRates[0]?.[selectedButton],
                        exchangeName: 'Crypto compare'
                    }
                ]}

            />
            {
                error ?
                    <div>
                        Something went wrong!
                    </div>
                    : null
            }
        </div>

}