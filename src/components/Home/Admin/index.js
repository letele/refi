import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import * as ROUTES from '../../../constants/routes'
import * as ROLES from '../../../constants/roles'

import Users from './Users'
import User from './User'
import Post from './Post'
import Posts from './Posts'
import withHome from '../WithHome'

import { withAuthorization } from '../../Session'
import { compose } from '../../../modules'


const Admin = () => {
    
    return (
        <div>
            Admin page  
            
            <nav> 
                <li><Link to={`${ROUTES.ADMIN_USERS}`}>Users</Link></li>
                <li><Link to={`${ROUTES.ADMIN_POSTS}`}>Posts</Link></li>
            </nav> 

            <Switch>
                <Route exact path={ROUTES.ADMIN_USER} component={User} />
                <Route exact path={ROUTES.ADMIN_USERS} component={Users} />
                <Route exact path={ROUTES.ADMIN_POST} component={Post} />
                <Route exact path={ROUTES.ADMIN_POSTS} component={Posts} />
            </Switch>
        </div>
    )
}


const cond =  authUser => authUser && !!authUser.roles[ROLES.ADMIN]

export default compose(withAuthorization(cond) ,withHome)(Admin)
