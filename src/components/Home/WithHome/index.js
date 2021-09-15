import React from 'react'
import { Link } from 'react-router-dom'
import {  GrUser, GrUserSettings, GrRun } from "react-icons/gr"

import * as ROUTES from '../../../constants/routes'
import { useAuth } from '../../Session'

const withHome = Component => props => {
    const authUser = useAuth()
    
    return( 
        <div>
            <header>
                <h3>
                    <Link to={ROUTES.HOME}> refi  </Link>
                </h3>
                <nav>
                    <li> 
                        <Link to={ROUTES.ACCOUNT}><GrUser /></Link> 
                    </li>
                    
                    {authUser.roles.ADMIN && <li>
                        <Link to={ROUTES.ADMIN}><GrUserSettings /></Link>
                    </li>}
   
                   
                    <li> 
                        <Link to={ROUTES.SIGN_OUT}><GrRun /></Link> 
                    </li>
                </nav>
            </header>
            <section>
                <Component {...props}/>
            </section>
        </div>
    )
}

export default withHome