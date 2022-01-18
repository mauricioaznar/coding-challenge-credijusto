import React, {useEffect} from 'react';
import './App.css';
import WelcomeForm from "./components/views/WelcomeForm";
import {Link, Redirect, Route, Switch, useHistory} from "react-router-dom";
import {useTypedSelector} from "./hooks/redux-hooks/useTypedSelector";
import CryptoComparator from "./components/views/CryptoComparator";

function App() {
    const {currentUser} = useTypedSelector((state) => state.auth);

    const history = useHistory()

    useEffect(() => {
        if (currentUser !== null) {
            const timeout = setTimeout(() => {
                history.push('/cryptos')
            }, 2000)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [currentUser])

    return (
        <div className="app">
            <Switch>
                <Route
                    path={'/welcome'}
                    render={() => {
                        return <WelcomeForm/>
                    }}
                    exact={true}
                />
                {
                    currentUser !== null ?
                        <Route
                            path={'/cryptos'}
                            render={() => {
                                return <CryptoComparator/>
                            }}

                            exact={true}
                        />
                        : null
                }

                <Redirect
                    to={currentUser !== null ? '/cryptos' : '/welcome'}
                    from={'/'}
                />
            </Switch>
        </div>
    );
}

export default App;
