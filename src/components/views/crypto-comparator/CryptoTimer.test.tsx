import React from 'react'
import {render} from "../../../test-utils/render";
import {act, screen} from "@testing-library/react";
import CryptoTimer from "./CryptoTimer";


describe('Crypto timer', () => {
    const defaultCallback = () => {};

    it('renders name', async () => {
        render(<CryptoTimer callback={defaultCallback} countdown={15}/>)
        const title = await screen.findByText(/Crypto timer/i);
        expect(title).toBeInTheDocument();
    })

    it('renders initial countdown with 10', async () => {
        render(<CryptoTimer callback={defaultCallback} countdown={10}/>)
        const title = await screen.findByText(/10s/i);
        expect(title).toBeInTheDocument();
    })

    it('renders timer', async () => {
        render(<CryptoTimer callback={defaultCallback} countdown={15}/>)
        const timer = await screen.findByText(/15s/i);
        expect(timer).toBeInTheDocument();
    })

    it('renders changes value to \'14s\' after 1 second (14s - 1s)', async () => {
        jest.useFakeTimers()
        render(<CryptoTimer callback={defaultCallback} countdown={15}/>)
        act(() => {
            jest.advanceTimersByTime(1000)
        })
        const timer = await screen.findByText(/14s/i);
        expect(timer).toBeInTheDocument();
    })

    it('renders changes value to \'2s\' after 13 seconds (15s - 13s)', async () => {
        jest.useFakeTimers();
        render(<CryptoTimer callback={defaultCallback} countdown={15}/>)
        act(() => {
            jest.advanceTimersByTime(13000);
        })
        const timer = await screen.findByText(/2s/i);
        expect(timer).toBeInTheDocument();

    })

    it('calls the callback after countdown has been completed', async () => {
        jest.useFakeTimers();
        const callback = jest.fn()
        render(<CryptoTimer callback={callback} countdown={15}/>)
        act(() => {
            jest.advanceTimersByTime(16000);
        })
        expect(callback).toHaveBeenCalled();
    })
})