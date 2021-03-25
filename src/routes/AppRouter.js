import React from 'react'
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import { AuthRouter } from './AuthRouter';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRouter } from './PublicRouter';

export const AppRouter = () => {
    return (
        <Router>
            <>
                <Switch>
                    <PublicRouter path="/auth" component={ AuthRouter }/>
                    <PrivateRoute path="/" component={ DashboardRoutes }/>
                </Switch>
            </>
        </Router>
    )
}
