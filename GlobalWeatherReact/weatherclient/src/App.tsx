import React from 'react';
import "./App.css";
import { Provider } from "react-redux";
import { store } from './store/configStore';
import AppRouter from "./router";


const App: React.FC = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
}

export default App;