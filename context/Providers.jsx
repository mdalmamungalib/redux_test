import React from 'react';
import { Provider } from 'react-redux';

const Providers = ({children}) => {
    return (
        <Provider>
            {children}
        </Provider>
    );
};

export default Providers;