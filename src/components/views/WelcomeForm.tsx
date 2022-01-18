import React, {FormEvent, useState} from 'react'
import './WelcomeForm.css'
import {useTypedSelector} from "../../hooks/redux-hooks/useTypedSelector";
import {useActions} from "../../hooks/redux-hooks/useActions";
import WelcomeFormInput from "./welcome-form/WelcomeFormInput";


export default function WelcomeForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')

    const {currentUser} = useTypedSelector((state) => state.auth);

    const {setCurrentUser} = useActions();

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
        <div className={'welcome-form'}>
            <form
                onSubmit={handleSubmit}
                data-testid={'welcome-form_form'}
                className={'welcome-form_form p-5'}
            >
                <h1>
                    Welcome!
                </h1>
                <hr/>
                <div className={'d-flex'}>
                    <WelcomeFormInput
                        className={'mr-4'}
                        label={'First name'}
                        value={firstName}
                        onChange={setFirstName}
                        id={'welcome-form-first-name'}
                    />
                    <WelcomeFormInput
                        label={'Last name'}
                        value={lastName}
                        onChange={setLastName}
                        id={'welcome-form-last-name'}
                    />
                </div>
                <WelcomeFormInput
                    label={'Email'}
                    type={'email'}
                    value={email}
                    onChange={setEmail}
                    id={'welcome-form-email'}
                />
                <WelcomeFormInput
                    label={'Telephone'}
                    value={telephone}
                    type={'tel'}
                    onChange={setTelephone}
                    id={'welcome-form-telephone'}
                />
                <div className={'d-flex justify-center mb-4'}>
                    <button
                        type={'submit'}
                        className={'button'}
                        data-testid={'welcome-form-submit-button'}
                    >
                        Submit
                    </button>
                </div>
                {
                    currentUser !== null
                        ? <div>
                            Thank you for signing up, {currentUser.firstName}
                        </div>
                        : null
                }
            </form>
        </div>

    )
}