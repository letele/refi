import React from 'react'
import { usePwordchange } from '../../../../modules'


const PasswordChange = () => {
    const { pwordI, pwordII, onSubmit, error, }  = usePwordchange()

    const invalid = pwordI.value === '' || pwordII.value !== pwordI.value 

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
            <legend>Change Password :</legend>  
            {inputForm(pwordI,"Password",'password')}<br/>
            
            {inputForm(pwordII,"Confirm Password",'password')}<br/> 

            <input disabled ={invalid} type="submit" value="reset password" />
            
            {error && <p>{error.message}</p>}
        </form>
    )
}

export default PasswordChange
