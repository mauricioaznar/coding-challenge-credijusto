import React from 'react';
import {act, screen} from '@testing-library/react';
import App from './App';
import {render} from "./test-utils/render";

describe('App', () => {
  it('renders cryptos link when user is defined', async () => {
    jest.useFakeTimers();
    render(<App />, {
      initialState: {
        auth: {
          currentUser: {
            firstName: "maria",
            lastName: "perez",
            email: "maria@gmail.com",
            telephone: "29393828283"
          }
        }
      }
    });

    act(() => {
      jest.advanceTimersByTime(3000)
    })


    const welcomeMessage = screen.queryByText(/Welcome/i);
    expect(welcomeMessage).not.toBeInTheDocument();
  });

  it('renders cryptos link when user is not defined', async () => {
    jest.useFakeTimers();
    render(<App />);

    act(() => {
      jest.advanceTimersByTime(3000)
    })

    const welcomeMessage = screen.getByText(/Welcome/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
})




