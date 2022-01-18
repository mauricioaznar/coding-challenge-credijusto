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

export default function CryptoComparator() {
    const isMounted = useRef(false);

    const {currentUser} = useTypedSelector((state) => state.auth);
    const [currentCount, setCount] = useState(15);

    const [coinGeckoRates, setCoinGeckoRates] = useState<Array<RatesWithDate>>([])
    const [cryptoCompareRates, setCryptoCompareRates] = useState<Array<RatesWithDate>>([])

    const links: (keyof Rates)[] = ['eth', 'btc', 'xrp']

    const [selectedLink, setSelectedLink] = useState(links[0])

    const [error, setError] = useState(false)


    const getCryptoRates = () => {
        axios.get(`${BASE_CRYPTO_COMPARE_URL}?fsyms=BTC%2CETH%2CXRP&tsyms=MXN`)
            .then(cryptoCompareResponse => {
                if (isMounted.current) {
                    const cryptoCompareRate = parseCryptoCompare(cryptoCompareResponse)

                    setCryptoCompareRates([cryptoCompareRate, ...cryptoCompareRates])
                }
            })
            .catch(e => {
                setError(true)
            })


        axios.get(`${BASE_COIN_GECKO_URL}?vs_currency=mxn&ids=bitcoin%2Cethereum%2Cripple`)
            .then(coinGeckoResponse => {
                if (isMounted.current) {
                    const coinGeckoRate = parseCoinGecko(coinGeckoResponse)


                    setCoinGeckoRates([coinGeckoRate, ...coinGeckoRates])

                }
            })
            .catch(e => {
                setError(true)
            })
    }

    useEffect(
        () => {
            getCryptoRates()
            isMounted.current = true
            return () => {
                isMounted.current = false
            }
        }, [])

    useEffect(
        () => {
            if (currentCount <= 0) {
                getCryptoRates()
                setCount(15)
            }
            const timeout = setTimeout(() => {
                setCount(currentCount - 1)
            }, 1000)
            return () => clearTimeout(timeout);
        }, [currentCount])


    const isLoading = coinGeckoRates.length === 0


    return <div>
            <nav>
                <h2>
                    Crypto comparator
                </h2>

                {
                    links.map(l => {
                        return (
                            <a
                                key={l}
                                href={'#'}
                                onClick={() => {
                                    setSelectedLink(l)
                                }}
                            >
                                { l }
                            </a>
                        )
                    })
                }
                <span>
                    {`${currentUser?.firstName} ${currentUser?.lastName}`}
                </span>
            </nav>
            <div>
                {currentCount}
            </div>

            <div>
                {
                    isLoading
                        ? <div>Loading...</div>
                        : <>
                            <CryptoRates rates={coinGeckoRates} name={'Coin gecko'} currentCrypto={selectedLink}/>
                            <CryptoRates rates={cryptoCompareRates} name={'Crypto compare'} currentCrypto={selectedLink}/>
                        </>
                }
            </div>
            <CryptoConverter

                exchangesUpdates={[
                    {
                        rate: coinGeckoRates[0]?.[selectedLink],
                        exchangeName: 'Coin gecko'
                    },
                    {
                        rate: cryptoCompareRates[0]?.[selectedLink],
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