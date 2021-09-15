import { useContext } from 'react'
import { AuthUserContext } from '.'

const useAuth = () => {
    const authUser = useContext(AuthUserContext)

    return authUser
}

export default useAuth