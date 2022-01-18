import {screen} from "@testing-library/react";
import React from "react";
import CryptoComparator from "./CryptoComparator";
import {render} from "../../test-utils/render";
import {RootState} from "../../redux/reducers";

const defaultStoreState: RootState = {
    auth: {
        currentUser: {
            firstName: "maria",
            lastName: "perez",
            email: "email@gmail.com",
            telephone: "23232323232"
        }
    }
}


describe('Crypto comparator', function () {
    it('renders title', () => {
        render(<CryptoComparator />, { initialState: defaultStoreState })
        const cryptoComparatorTitle = screen.getByText(/Crypto comparator/i);
        expect(cryptoComparatorTitle).toBeInTheDocument();
    })

    it('renders navbar with user first-name', () => {
        render(<CryptoComparator />, { initialState: defaultStoreState })
        const nav = screen.getByRole('navigation');
        expect(nav).toHaveTextContent(/maria perez/i)
    })

});