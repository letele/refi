import React, { useState } from 'react'
import {  GrEdit, GrTrash } from "react-icons/gr"

import {  useEntities, useFirebase } from '../../../firebase'
import { useAuth } from '../../Session'
import { useInput } from '../../../modules'
import CreatePost from './CreatePost'

const Posts = () => {
    const [txtEdit, setxtEdit] = useState(false)
    
    const { entity, remove, serverTimestamp, update, } = useFirebase()
    
    const posts = useEntities('posts')
    
    const authUser = useAuth()
    
    const editText = useInput('')

    const edit = (uid,text) => {
        const ref = entity(uid,'posts')
        update(ref, {
            text,
            editedAt: serverTimestamp(),
        }).catch(err => console.log(err))

        setxtEdit(false)
    }

    const editPost = (txt,uid) => {
        editText.setValue(txt)
        setxtEdit(uid)
    }
    
    return (
       posts && !!posts.length  && 
        <div>
            {posts.map(post => 
            <article key={post.uid}>
                <h5>{post.authorName}</h5>
                
                {txtEdit === post.uid  ? 
                <form onSubmit={e => 
                    editText.onSubmit(e, () => edit(post.uid,editText.value, ))
                }>
                    <textarea
                        onChange={editText.onChange}
                        value={editText.value}
                        rows="5"
                    />
                    
                    <div>
                        <input type="submit" value="save" />
                        <input 
                            onClick={() => setxtEdit(false)}
                            type="button" 
                            value="cancel" 
                        />
                    </div>
                 </form> : 
                <p>{post.text}</p> }
                
            
                {authUser.uid === post.authorId && !txtEdit && 
                <div>
                    <button onClick={() => editPost(post.text,post.uid)}><GrEdit /></button>
                    <button onClick={() => remove(entity(post.uid,'posts'))}><GrTrash /></button>
                </div>}

                <div>created @ {post.createdAt}</div>
                {post.editedAt && <div>edited @ {post.editedAt}</div>}
            </article>)}
        </div>
    )
}

export {CreatePost}

export default Posts
