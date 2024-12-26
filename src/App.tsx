import React from 'react';
import { Provider } from 'react-redux';
import AppRoutes from './AppRoutes';
import store from './Store/store';
import './Style.css'


const App: React.FC = () => (
    <Provider store={store}>
        <AppRoutes />
    </Provider>
);

export default App;
