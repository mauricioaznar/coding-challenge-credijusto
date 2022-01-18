import {rest} from "msw";
import {setupServer} from "msw/node";
import {BASE_COIN_GECKO_URL, BASE_CRYPTO_COMPARE_URL} from "../helpers/constants";

const handlers = [
    rest.get(BASE_CRYPTO_COMPARE_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            "BTC": {"MXN": 847738.22},
            "ETH": {"MXN": 63784.51},
            "XRP": {"MXN": 15.14}
        }));
    }),
    rest.get(BASE_COIN_GECKO_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(
            [{
                "id": "bitcoin",
                "symbol": "btc",
                "name": "Bitcoin",
                "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
                "current_price": 42292,
                "market_cap": 800702499752,
                "market_cap_rank": 1,
                "fully_diluted_valuation": 888131379186,
                "total_volume": 17682189167,
                "high_24h": 43027,
                "low_24h": 41641,
                "price_change_24h": -588.699642447798,
                "price_change_percentage_24h": -1.37289,
                "market_cap_change_24h": -11631025453.542358,
                "market_cap_change_percentage_24h": -1.4318,
                "circulating_supply": 18932731.0,
                "total_supply": 21000000.0,
                "max_supply": 21000000.0,
                "ath": 69045,
                "ath_change_percentage": -38.74703,
                "ath_date": "2021-11-10T14:24:11.849Z",
                "atl": 67.81,
                "atl_change_percentage": 62269.25841,
                "atl_date": "2013-07-06T00:00:00.000Z",
                "roi": null,
                "last_updated": "2022-01-18T02:20:13.947Z"
            },
                {
                    "id": "ethereum",
                    "symbol": "eth",
                    "name": "Ethereum",
                    "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
                    "current_price": 3218.67,
                    "market_cap": 383686112558,
                    "market_cap_rank": 2,
                    "fully_diluted_valuation": null,
                    "total_volume": 11991462301,
                    "high_24h": 3332.33,
                    "low_24h": 3156.67,
                    "price_change_24h": -100.352558559394,
                    "price_change_percentage_24h": -3.02356,
                    "market_cap_change_24h": -12141858630.619568,
                    "market_cap_change_percentage_24h": -3.06746,
                    "circulating_supply": 119204648.999,
                    "total_supply": null,
                    "max_supply": null,
                    "ath": 4878.26,
                    "ath_change_percentage": -34.01911,
                    "ath_date": "2021-11-10T14:24:19.604Z",
                    "atl": 0.432979,
                    "atl_change_percentage": 743289.55736,
                    "atl_date": "2015-10-20T00:00:00.000Z",
                    "roi": {"times": 100.76544733944569, "currency": "btc", "percentage": 10076.544733944569},
                    "last_updated": "2022-01-18T02:20:30.100Z"
                },
                {
                    "id": "ripple",
                    "symbol": "xrp",
                    "name": "XRP",
                    "image": "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
                    "current_price": 0.765798,
                    "market_cap": 36499393698,
                    "market_cap_rank": 8,
                    "fully_diluted_valuation": 76577856231,
                    "total_volume": 2152304377,
                    "high_24h": 0.777629,
                    "low_24h": 0.751883,
                    "price_change_24h": -0.010200096613,
                    "price_change_percentage_24h": -1.31445,
                    "market_cap_change_24h": -507186301.8328934,
                    "market_cap_change_percentage_24h": -1.37053,
                    "circulating_supply": 47663117635.0,
                    "total_supply": 100000000000.0,
                    "max_supply": 100000000000.0,
                    "ath": 3.4,
                    "ath_change_percentage": -77.46683,
                    "ath_date": "2018-01-07T00:00:00.000Z",
                    "atl": 0.00268621,
                    "atl_change_percentage": 28407.80519,
                    "atl_date": "2014-05-22T00:00:00.000Z",
                    "roi": null,
                    "last_updated": "2022-01-18T02:20:30.793Z"
                }]
        ));
    }),
]

export const coinGeckoException = rest.get(BASE_CRYPTO_COMPARE_URL, (req, res, ctx) => {
        return res(ctx.status(400));
    })

const server = setupServer(...handlers);

export {server, rest};