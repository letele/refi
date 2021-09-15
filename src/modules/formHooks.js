import { useState } from "react"
import { useHistory } from "react-router"

import { useFirebase } from "../firebase"
import * as ROUTES from '../constants/routes'

const useInput = (initValue) => {
    const [value, setValue] = useState(initValue)

    const onChange = e => setValue(e.target.value)

    const onSubmit = (e,func) =>  {
        func()
        setValue('')
        e.preventDefault()
    }
    
    return { value, onChange, onSubmit,setValue} 
}

const usePwordchange = () => {
    const [error, setError] = useState(null)
    
    const firebase = useFirebase()
    
    const pwordI = useInput('')

    const pwordII = useInput('')

   const onSubmit = e => {        
        e.preventDefault()
        firebase.pwordUpdate(pwordI.value)
        .then(() =>{
            pwordI.setValue('')
            pwordII.setValue('')
        }).catch(error => setError(error))
        
    }

    return { pwordI, pwordII, error, onSubmit, setError  }
}

const usePwordforget = () => {
    const [error, setError] = useState(null)
    
    const firebase = useFirebase()
    
    const email = useInput('')

    const onSubmit = e =>{
        e.preventDefault()
        firebase.resetPassword(email.value)
        .then(() => email.setValue(''))
        .catch(err => setError(err))
    }

    return { email, error, onSubmit, setError  }
}

const useSignIn = () => {
    const [error, setError] = useState(null)

    const history = useHistory()
    
    const firebase = useFirebase()
    
    const email = useInput('')
    
    const pword = useInput('')

    const invalid = email.value === '' || pword.value === ''

    const onSubmit = e => {
        firebase.logIn(email.value,pword.value)
        .then(() => {
            email.setValue('')
            pword.setValue('')
            history.push(ROUTES.HOME)
        })
        .catch(err => setError(err))   
        
        e.preventDefault()
    }

    return { email , error, setError, pword, invalid, onSubmit }
}

const useSignUp = (name) => {
    const [error, setError] = useState(null)
    
    const history = useHistory()
    
    const { createUser,  set , db, ref} = useFirebase()
    
    const email = useInput('')
    
    const userName = useInput('')
    
    const pwordI = useInput('')
    
    const pwordII = useInput('')
    
    const invalid = (
        pwordI.value !== pwordII.value || pwordI.value === '' 
        || email.value === '' || userName.value === ''
    )
    
    const onSubmit = e => {
        createUser(email.value, pwordI.value)
        .then(authUser => set(
            ref(db,`${name}/${authUser.user.uid}`),
            {
                userName: userName.value,
                email: email.value,
            }
        ))
        .then(() => {
            email.setValue('')
            pwordI.setValue('')
            pwordII.setValue('')
            userName.setValue('')
            
            history.push(ROUTES.HOME)
        })
        .catch(err => setError(err))   

        e.preventDefault()
    }

    return { email , userName, pwordI, pwordII, error,onSubmit,invalid, setError }
}

export { useInput, usePwordchange, usePwordforget, useSignIn, useSignUp, }