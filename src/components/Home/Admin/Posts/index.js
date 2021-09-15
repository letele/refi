import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../../../constants/routes'
import { useEntities } from '../../../../firebase'

const Posts = () => {

    const posts = useEntities('posts')

    return (
        <div> {posts && !!posts.length  && 
            <table>
                <thead> 
                    <tr>
                        <th>ID</th>
                        <th>Author</th>
                        <th>Text</th>
                    </tr>
                </thead>
                 <tbody>
                    {posts.map(post => (
                    <tr key={post.uid}>
                        <td> 
                            <Link to={`${ROUTES.ADMIN_POSTS}/${post.uid}`} > {post.uid} </Link>
                        </td>
                        <td>{post.authorName}</td>
                        <td>{post.text}</td>
                    </tr> ))}
                 </tbody>
            </table>}
        </div>
    )
}

export default Posts