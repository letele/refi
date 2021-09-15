import React from 'react'

import {  useFirebase } from '../../../../firebase'
import { useInput } from '../../../../modules'
import { useAuth } from '../../../Session'

const CreatePost = () => {
    const {set, push, entities, serverTimestamp} = useFirebase()

    const authUser = useAuth()
    
    const text = useInput('')

    const submit = () => set(push(entities('posts')), {
        authorId: authUser.uid,
        authorName: authUser.userName,
        createdAt: serverTimestamp(),
        text: text.value,
    })
    return ( 
        <form onSubmit={ e => text.onSubmit(e,submit) }>      
            <textarea
                onChange={text.onChange}
                value={text.value}
                rows="5"
                placeholder="Post a message"
            /><br />
            <input disabled={text.value === ''} type="submit" value="post" />
        </form>
    )
}

export default CreatePost
