import React from 'react'

import { compose } from '../../modules'
import {withAuthorization} from '../Session'
import withHome from './WithHome'

import Posts, { CreatePost } from './Posts'

const Home = () => {

    return (
        <div>
            <CreatePost />

            <Posts />
        </div>
    )
}

const cond = authUser => !!authUser

export default compose( withAuthorization(cond),withHome)(Home)
