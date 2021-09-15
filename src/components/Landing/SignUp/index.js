import React from 'react'

import { withLanding } from '..'
import { useSignUp } from '../../../modules'

const SignUp = () => {
    const signUp = useSignUp('users')

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
        <form onSubmit={signUp.onSubmit}>
            <legend>Sign Up :</legend>  
            
            {inputForm(signUp.email,"Email Address",'text')}<br/>
            
            {inputForm(signUp.userName,"Full Name",'text')}<br/>
            
            {inputForm(signUp.pwordI,"Password",'password')}<br/>
            
            {inputForm(signUp.pwordII,"Confirm Password",'password')}<br/> 
            
            <input disabled={signUp.invalid} type="submit" value="sign up" />

            {signUp.error && <p>{signUp.error.message}</p>}
        </form>
    )
}

export default withLanding(SignUp)
