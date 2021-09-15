import React from 'react'

import {  usePwordforget } from '../../../modules'
import { withLanding } from '..'

const PasswordForget = () => {
    const {onSubmit, email, error} = usePwordforget()

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
            <legend>Reset Password :</legend>  
            {inputForm(email, 'Email address','text')}<br/>
            <input type="submit" value="reset password" />
            
            {error && <p>{error.message}</p>}
        </form>
    )
}

export default withLanding(PasswordForget)
