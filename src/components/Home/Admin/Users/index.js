import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../../../constants/routes'
import { useEntities } from '../../../../firebase'

const Users = () => {
    
    const users = useEntities('users')
    
    const posts = useEntities('posts')

    const getPosts = (uid) => posts.filter( post => post.authorId === uid)

    return (
        <div>
            {users && !!users.length  && 
            <table>
                <thead> 
                    <tr>
                        <th>User name</th>
                        <th>Email</th>
                        <th>Posts</th>
                    </tr>
                </thead>
                 <tbody>
                    {users.map(user => (
                    <tr key={user.uid}>
                        <td> 
                            <Link to={`${ROUTES.ADMIN_USERS}/${user.uid}`}> {user.userName} </Link>
                        </td>
                        <td>{user.email}</td>
                        <td>{getPosts(user.uid).length}</td>
                    </tr> ))}
                 </tbody>
            </table>}
        </div>
    )
}

export default Users
