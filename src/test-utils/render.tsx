import {render as rtlRender, RenderOptions} from "@testing-library/react"
import {rootReducer, RootState} from "../redux/reducers";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {middlewares} from "../redux/store";
import {BrowserRouter} from "react-router-dom";

interface ExtendedRenderOptions extends RenderOptions {
    initialState: Partial<RootState>
}

export const render = (
    component: React.ReactElement,
    {
        initialState,
        ...renderOptions
    }: ExtendedRenderOptions = {
        initialState: {},
    }
) => {
    const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))

    return rtlRender(component, {
        wrapper: AppTestWrapper(store),
        ...renderOptions,
    })
}

const AppTestWrapper = (store: any) => ({
                                            children,
                                        }: {
    children?: React.ReactNode
}) => <BrowserRouter><Provider store={store}>{children}</Provider></BrowserRouter>
