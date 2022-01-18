import {useTypedSelector} from "../../hooks/redux-hooks/useTypedSelector";
import {useEffect, useState} from "react";
import axios from "axios";
import {Rates} from "../../types/rates";
import {parseCoinGecko} from "../../helpers/parse-coin-gecko";
import {BASE_COIN_GECKO_URL, BASE_CRYPTO_COMPARE_URL} from "../../helpers/constants";
import {parseCryptoCompare} from "../../helpers/parse-crypto-compare";

export default function CryptoComparator() {
    const {currentUser} = useTypedSelector((state) => state.auth);
    const [currentCount, setCount] = useState(15);

    const [coinGeckoRates, setCoinGeckoRates] = useState<Array<Rates>>([])
    const [cryptoCompareRates, setCryptoCompareRates] = useState<Array<Rates>>([])


    const timer = () => setCount(currentCount - 1);

    const getCryptoRates = async () => {
        try {
            const coinGeckoResponse = await axios.get(`${BASE_COIN_GECKO_URL}?vs_currency=usd&ids=bitcoin%2Cethereum%2Cripple`)
            const cryptoCompareResponse = await axios.get(`${BASE_CRYPTO_COMPARE_URL}?fsyms=BTC%2CETH%2CXRP&tsyms=USD`)

            const coinGeckoRate = parseCoinGecko(coinGeckoResponse)
            const cryptoCompareRate = parseCryptoCompare(cryptoCompareResponse)

            setCoinGeckoRates([...coinGeckoRates, coinGeckoRate])
            setCryptoCompareRates([...cryptoCompareRates, cryptoCompareRate])

        } catch (e) {

        }
    }

    useEffect(
        () => {
            getCryptoRates()
        }, [])

    useEffect(
        () => {
            if (currentCount <= 0) {
                getCryptoRates()
                setCount(15)
            }
            const timeout = setTimeout(() => {
                timer()
            }, 1000)
            return () => clearTimeout(timeout);
        }, [currentCount])



    const isLoading = coinGeckoRates.length === 0


    return (
        <div>
            <nav>
                <h2>
                    Crypto comparator
                </h2>
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
                        ? <div>Loading</div>
                        : <ul>
                                {
                                    coinGeckoRates.map((r, index) => {
                                        return (
                                            <li key={index}>
                                                {
                                                    r.eth
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                }
            </div>

        </div>
    )
}