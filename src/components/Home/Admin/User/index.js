import React from 'react'
import { useEntity , useEntities} from '../../../../firebase'


const User = () => {

    const user = useEntity('users')

    const allPosts = useEntities('posts')

    const getPosts = uid => allPosts.filter(post => post.authorId === uid)

    const userPosts = user && getPosts(user.uid)

   
    return user &&  ( 
        <div>
            <h3>{user.userName} page</h3>  

            <article>{userPosts && userPosts.map( post => (
                <div key={post.uid}>{post.text}</div>
            ))}</article>
        </div>
    )
}

export default User
