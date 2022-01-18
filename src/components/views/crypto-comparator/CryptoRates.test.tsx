import {screen} from "@testing-library/react";
import React from "react";
import CryptoRates from "./CryptoRates";
import {render} from "../../../test-utils/render";


describe('Crypto rates', function () {
    it('renders name', async () => {
        render(<CryptoRates
            name={'Crypto compare'}
            rates={[]}
            currentCrypto={'eth'}
        />)
        const title = await screen.findByText(/Crypto compare/i);
        expect(title).toBeInTheDocument();
    })

    it('display current crypto name', async () => {
        render(<CryptoRates
            name={'Crypto compare'}
            rates={[]}
            currentCrypto={'eth'}
        />)
        const title = await screen.findByText(/ETH/i);
        expect(title).toBeInTheDocument();
    })

    it('only display 6 items', async () => {
        render(<CryptoRates
            name={'Crypto compare'}
            rates={[
                { eth: 0, xrp: 0, btc: 0, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },

            ]}
            currentCrypto={'eth'}
        />)
        const listitems = await screen.findAllByRole('listitem');
        expect(listitems).toHaveLength(6);
    })

    it('displays first item item first', async () => {
        render(<CryptoRates
            name={'Crypto compare'}
            rates={[
                { eth: 1, xrp: 1, btc: 1, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },
                { eth: 0, xrp: 0, btc: 0, date: '' },
            ]}
            currentCrypto={'eth'}
        />)
        const listitems = await screen.findAllByRole('listitem');
        expect(listitems[0]).toHaveTextContent('1');
    })
});