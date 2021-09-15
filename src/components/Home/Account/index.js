import React from 'react'

import {compose} from '../../../modules'
import {withAuthorization, useAuth} from '../../Session'
import withHome from '../WithHome'

import PasswordChange from './PasswordChange'

const Account = () => {    
    const authUser = useAuth()
    
    return (
        <div>
            <h3>Account : {authUser.email}</h3>
            
            <PasswordChange />

        </div>
    )
}

const cond = user => !!user

export default compose(withAuthorization(cond) ,withHome)(Account)
