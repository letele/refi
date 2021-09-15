import React, { useState } from 'react'
import { useFirebase } from '../../../../firebase'

const DeleteAccount = () =>{    
    const firebase = useFirebase()
    const [error, setError] = useState(null)
    
    const deleteUser = () => 
    firebase.removeUser().catch(error => setError(error))
    
    return (
        <div>
            <button onClick={deleteUser}>Delete account</button>
            {error && <p>{error.message}</p>}
        </div>
    )
}

export default DeleteAccount
