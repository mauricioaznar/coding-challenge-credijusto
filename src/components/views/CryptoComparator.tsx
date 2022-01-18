import {useTypedSelector} from "../../hooks/redux-hooks/useTypedSelector";
import {useEffect, useState} from "react";
import axios from "axios";
import {parseCryptoCompare} from "../../helpers/parse-crypto-compare";
import {Rates} from "../../models/rates";
import {parseCoinGecko} from "../../helpers/parse-coin-gecko";

export default function CryptoComparator() {
    const {currentUser} = useTypedSelector((state) => state.auth);
    const [currentCount, setCount] = useState(15);

    const [coinGeckoRates, setCoinGeckoRates] = useState<Array<Rates>>([])
    const [cryptoCompareRates, setCryptoCompareRates] = useState<Array<Rates>>([])


    const timer = () => setCount(currentCount - 1);

    const getCryptoRates = async () => {
        try {
            const responses = await Promise.all(
                [
                    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cripple'),
                    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC%2CETH%2CXRP&tsyms=USD')
                ]
            )
            const coinGeckoRate = parseCoinGecko(responses[0])
            const cryptoCompareRate = parseCryptoCompare(responses[1])

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
                <ul>
                    {
                        coinGeckoRates.map((r, index) => {
                            return (
                                <li>
                                    {
                                        r.eth
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </div>
    )
}