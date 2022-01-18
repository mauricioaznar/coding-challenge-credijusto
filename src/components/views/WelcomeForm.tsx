import React, {FormEvent, useState} from 'react'
import {useTypedSelector} from "../../hooks/redux-hooks/useTypedSelector";
import {useActions} from "../../hooks/redux-hooks/useActions";


export default function WelcomeForm () {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')

    const { currentUser } = useTypedSelector((state) => state.auth);

    const { setCurrentUser } = useActions();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setCurrentUser({
            firstName,
            lastName,
            email,
            telephone
        })
    }

    return (
        <form onSubmit={handleSubmit} data-testid={'welcome-form-form'}>
            <h1>
                Welcome!
            </h1>
            <div>
                <input
                    type={'text'}
                    data-testid={'welcome-form-first-name'}
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type={'text'}
                    data-testid={'welcome-form-last-name'}
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <input
                    type={'email'}
                    data-testid={'welcome-form-email'}
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <input
                    type={'tel'}
                    data-testid={'welcome-form-telephone'}
                    value={telephone}
                    required
                    onChange={(e) => setTelephone(e.target.value)}
                />
            </div>
            <div>
                <button
                    type={'submit'}
                    data-testid={'welcome-form-submit-button'}
                >
                    Submit
                </button>
            </div>
            {
                currentUser !== null
                    ? <div>
                        Thank you for signing up, { currentUser.firstName }
                    </div>
                    : null
            }
        </form>
    )
}