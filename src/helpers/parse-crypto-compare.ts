import {Rates} from "../types/rates";

export function parseCryptoCompare(cryptoCompareResponse: { data: any }): Rates {
    return {
        eth: 0,
        btc: 0,
        xrp: 0,
    }
}