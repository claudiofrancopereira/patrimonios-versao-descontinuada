import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './Pages/Home';
import Patrimonio from './Pages/Patrimonios';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact={true} />
            <Route component={Patrimonio} path="/patrimonios" exact={true} />
        </BrowserRouter>
    );
};

export default Routes;
