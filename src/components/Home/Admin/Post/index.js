import React from 'react'

import { useEntity } from '../../../../firebase'

const Post = () => {

    const post = useEntity('posts') 
    
    return ( post && 
        <div>
            <h4>{post.authorName}</h4>   
            <p>{post.text}</p> 
        </div>
    )
}

export default Post
