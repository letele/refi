import React, {useEffect, useState } from 'react'
import { useFirebase } from '../../firebase';
import { AuthUserContext } from '.'


const withAuthentication = Component => {
    const WithAuthentication = (props) => {
        const [authUser, setAuthUser] = useState(JSON.parse(sessionStorage.getItem('authUser')))
        
        const firebase = useFirebase()

        const setUser = user => {
            sessionStorage.setItem('authUser', JSON.stringify(user))
            setAuthUser(user)
        }

        const removeUser = () => {
            sessionStorage.removeItem('authUser')
            setAuthUser(null)
        }

        useEffect(() => {
            const listener = firebase.onAuthUserListener(
                user => setUser(user), 
                removeUser
            )

            return listener
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

        return (
            <AuthUserContext.Provider value={authUser}>
                <Component {...props} />
            </AuthUserContext.Provider>
        )
    }
    
    return WithAuthentication
};

export default withAuthentication