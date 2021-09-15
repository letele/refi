import React from 'react'
import { Link } from 'react-router-dom'

// import { FirebaseContext } from '../../../firebase'
import * as ROUTES from '../../../constants/routes'
import { withLanding } from '..'
import {   useSignIn } from '../../../modules'

const SignIn = () => {
  
    const { email, pword, invalid, error, onSubmit } = useSignIn()

    const inputForm = (name,placeHolder,type) => {
        return(
            <input
                onChange={name.onChange}
                placeholder={placeHolder}
                type={type}
                value={name.value}
            />
        )
    }

    return (
        <form onSubmit={onSubmit}>
            <legend>Sign In :</legend>  
            
            {inputForm(email,"Email Address",'text')}<br/>
            
            {inputForm(pword,"Password",'password')}<br/>
            
            <div> <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password ?</Link> </div>
            
            <input disabled={invalid} type="submit" value="sign in" />

            {error && <p>{error.message}</p>}
        </form>
    )
}

export default  withLanding(SignIn)
