import React from 'react'
import { BrowserRouter,Route } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'
import {withAuthentication} from '../Session'

import Landing from '../Landing'
import SignUp from '../Landing/SignUp'
import SignIn from '../Landing/SignIn'
import PasswordForget from '../Landing/PasswordForget'

import Home from '../Home'
import Account from '../Home/Account'
import Admin from '../Home/Admin'
import SignOut from '../Home/SignOut'

const  App = () => {
    return (
        <BrowserRouter>
            <Route exact path={ROUTES.LANDING} component={Landing} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
            <Route path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.ACCOUNT} component={Account} />
            <Route path={ROUTES.ADMIN} component={Admin} /> 
            <Route path={ROUTES.SIGN_OUT} component={SignOut} />
        </BrowserRouter>
    )
}

export default withAuthentication(App)
