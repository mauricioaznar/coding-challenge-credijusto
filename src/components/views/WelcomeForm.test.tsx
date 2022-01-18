import {screen, fireEvent} from "@testing-library/react";
import React from "react";
import WelcomeForm from "./WelcomeForm";
import {render} from "../../test-utils/render";

describe('Welcome form', () => {
    it('renders welcome page', () => {
        render(<WelcomeForm />);
        const welcomeMessage = screen.getByText(/Welcome/i);
        expect(welcomeMessage).toBeInTheDocument();
    });

    it('renders first-name input', () => {
        render(<WelcomeForm />)
        const input = screen.queryByTestId('welcome-form-first-name')
        expect(input).not.toBeNull()
    })

    it('changes first-name when change event is fired inside input', () => {
        render(<WelcomeForm />)
        const newValue = 'home'
        const input = screen.getByTestId('welcome-form-first-name') as HTMLInputElement
        fireEvent.change(input,{ target: { value: newValue}})
        expect(input.value).toBe(newValue)
    })

    it('renders last-name input', () => {
        render(<WelcomeForm />)
        const input = screen.queryByTestId('welcome-form-last-name')
        expect(input).not.toBeNull()
    })

    it('changes last-name when change event is fired inside input', () => {
        render(<WelcomeForm />)
        const newValue = 'home'
        const input = screen.getByTestId('welcome-form-last-name') as HTMLInputElement
        fireEvent.change(input,{ target: { value: newValue }})
        expect(input.value).toBe(newValue)
    })

    it('renders email input', () => {
        render(<WelcomeForm />)
        const input = screen.queryByTestId('welcome-form-email')
        expect(input).not.toBeNull()
    })

    it('changes email when change event is fired inside input', () => {
        render(<WelcomeForm />)
        const newValue = 'home@example.com'
        const input = screen.getByTestId('welcome-form-email') as HTMLInputElement
        fireEvent.change(input,{ target: { value: newValue }})
        expect(input.value).toBe(newValue)
    })

    it('renders telephone input', () => {
        render(<WelcomeForm />)
        const input = screen.queryByTestId('welcome-form-telephone')
        expect(input).not.toBeNull()
    })

    it('changes telephone when change event is fired inside input', () => {
        render(<WelcomeForm />)
        const newValue = '999-321-32-32'
        const input = screen.getByTestId('welcome-form-telephone') as HTMLInputElement
        fireEvent.change(input,{ target: { value: newValue }})
        expect(input.value).toBe(newValue)
    })

    it('renders submit button', () => {
        render(<WelcomeForm />)
        const input = screen.queryByTestId('welcome-form-submit-button')
        expect(input).not.toBeNull()
    })

    it('submits the form if all fields are correctly filled', () => {
        render(<WelcomeForm />)
        const firstNameInput = screen.getByTestId('welcome-form-first-name') as HTMLInputElement
        fireEvent.change(firstNameInput,{ target: { value: 'firstname' }})
        const lastNameInput = screen.getByTestId('welcome-form-last-name') as HTMLInputElement
        fireEvent.change(lastNameInput,{ target: { value: 'lastname' }})
        const emailInput = screen.getByTestId('welcome-form-email') as HTMLInputElement
        fireEvent.change(emailInput,{ target: { value: 'home@example.com' }})
        const telephoneInput = screen.getByTestId('welcome-form-telephone') as HTMLInputElement
        fireEvent.change(telephoneInput,{ target: { value: '999-11-11' }})
        const submitButton = screen.getByTestId('welcome-form-submit-button') as HTMLButtonElement
        fireEvent.click(submitButton)

        expect(screen.getByText("Thank you for signing up, firstname")).toBeInTheDocument()
    })

    it('renders message if user already has submitted', () => {
        render(<WelcomeForm />, {
            initialState: {
                auth: {
                    currentUser: {
                        firstName: "mandy",
                        lastName: "pandy",
                        email: "email@example.com",
                        telephone: "20303030"
                    }
                }
            }
        })

        expect(screen.getByText("Thank you for signing up, mandy")).toBeInTheDocument()
    })
})




