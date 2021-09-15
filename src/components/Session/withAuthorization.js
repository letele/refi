import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'
import { useFirebase } from '../../firebase'
import { useAuth } from '.'

const withAuthorization = condition => Component => props => {   
    const history = useHistory()
    
    const authUser = useAuth()
    
    const firebase = useFirebase()
    
    const authorize = user =>  
    !condition(user) && history.push(ROUTES.LANDING)

    useEffect(() => {
        const listener = firebase.onAuthUserListener(
            authUser => authorize(authUser),
            () => history.push(ROUTES.LANDING)
        )

       return listener
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return condition(authUser) && <Component {...props} /> 
}

export default withAuthorization