import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';

const MainRouter = () => (
    <div>
        <Switch>
            <Route path="/" component={Home} ></Route>
        </Switch>
    </div>
)

export default MainRouter;