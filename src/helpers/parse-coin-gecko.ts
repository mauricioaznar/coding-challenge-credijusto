import {Rates} from "../types/rates";

export function parseCoinGecko(coinGeckoResponse: { data: any }): Rates {
    const data = coinGeckoResponse.data


    //
    // let eth = data.find((d: any)=> d.id === 'ethereum')?.current_price | 0
    // let btc = data.find((d: any)=> d.id === 'bitcoin')?.current_price | 0
    // let xrp = data.find((d: any)=> d.id === 'ripple')?.current_price | 0

    return {
        eth: 0,
        btc: 0,
        xrp: 0,
    }
}