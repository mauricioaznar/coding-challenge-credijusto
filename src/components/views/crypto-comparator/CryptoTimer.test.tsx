import React from 'react'
import {render} from "../../../test-utils/render";
import CryptoRates from "./CryptoRates";
import {screen} from "@testing-library/react";
import CryptoTimer from "./CryptoTimer";


describe('Crypto timer', () => {
    it('renders name', async () => {
        render(<CryptoTimer/>)
        const title = await screen.findByText(/Crypto timer/i);
        expect(title).toBeInTheDocument();
    })

    it('renders timer', async () => {
        render(<CryptoTimer/>)
        const timer = await screen.findByText(/15s/i);
        expect(timer).toBeInTheDocument();
    })
})