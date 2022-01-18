import {act, findAllByRole, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import React from "react";
import CryptoComparator from "./CryptoComparator";
import {render} from "../../test-utils/render";
import {RootState} from "../../redux/reducers";
import {wait} from "@testing-library/user-event/dist/utils";

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
    it('renders title', async () => {
        render(<CryptoComparator />, { initialState: defaultStoreState })
        await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i))
        const list = await screen.findByRole('list');
        expect(list).toBeInTheDocument();
    })

    it('renders navbar with user first-name', async () => {
        render(<CryptoComparator />, { initialState: defaultStoreState })
        const nav = await waitFor(() => screen.findByRole('navigation'));
        expect(nav).toHaveTextContent(/maria perez/i)
        await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i))
    })


    it('renders one list item at the beginning of the render', async () => {
        render(<CryptoComparator />, { initialState: defaultStoreState })
        const listitems = await screen.findAllByRole('listitem')
        expect(listitems).toHaveLength(1)
    })

    it('renders 2 list items after 15 seconds', async () => {
        render(<CryptoComparator />, { initialState: defaultStoreState })
        let listitems = await screen.findAllByRole('listitem')
        expect(listitems).toHaveLength(1)
    })

});