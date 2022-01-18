import {RatesWithDate} from "../types/rates-with-date";
import {getFormattedDateTime} from "./date-format";

export function parseCryptoCompare(cryptoCompareResponse: { data: any }): RatesWithDate {
    const data = cryptoCompareResponse.data


    return {
        date: getFormattedDateTime(),
        eth: data['ETH']['MXN'],
        btc: data['BTC']['MXN'],
        xrp: data['XRP']['MXN'],
    }
}