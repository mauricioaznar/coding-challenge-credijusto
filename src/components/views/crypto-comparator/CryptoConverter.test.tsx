import {fireEvent, screen} from "@testing-library/react";
import React from "react";
import {render} from "../../../test-utils/render";
import CryptoConverter from "./CryptoConverter";


describe('Crypto converter', function () {
    it('renders input', async () => {
        render(<CryptoConverter
            exchangesUpdates={[]}
        />)
        const input = screen.queryByTestId('crypto-converter-input');
        expect(input).not.toBeNull()
    })

    it('get exchange name', async () => {
        render(<CryptoConverter
            exchangesUpdates={[

                {
                    rate: 100,
                    exchangeName: "Bitso"
                }
            ]}
        />)
        const input = screen.queryByText(/Bitso/i);
        expect(input).not.toBeNull()
    })

    it('gets correct conversion', async () => {
        render(<CryptoConverter
            exchangesUpdates={[

                {
                    rate: 100,
                    exchangeName: "Bitso"
                }
            ]}
        />)
        const input = screen.queryByTestId('crypto-converter-input') as HTMLInputElement
        fireEvent.change(input,{ target: { value: '20000' }})

        const conversion = screen.queryByText(/200/i);
        expect(conversion).toBeInTheDocument()
    })
});

