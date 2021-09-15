import React from 'react'

import withHome from '../WithHome'
import { withAuthorization } from '../../Session'
import { compose } from '../../../modules'
import { useFirebase } from '../../../firebase'


const SignOut = () => {
    const firebase = useFirebase()
    return (
        <div>
            <button onClick={firebase.logOut}>signout</button>
        </div>
    )
}

const cond = user => !!user

export default compose(withAuthorization(cond) ,withHome)(SignOut)
