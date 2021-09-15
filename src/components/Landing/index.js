import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const withLanding = Component => props => ( 
    <div id="landing">
        <header>
            <h3>
                <Link to={ROUTES.LANDING}> refi  </Link>
            </h3>
        </header>
        <section>
            <h4>Boiler plate for web applications</h4>
            <ul>
                <li>front-end: react.js</li>
                <li>back-end: firebase</li>
            </ul>
            <h4>Features:</h4>
            <ul>
                <li>Authetication and authorization of users</li>
                <li>CREATE, READ, UPDATE, DELETE, app data </li>
                <li>Statistical analysis of app data.</li>
            </ul>
            <nav>
                <li>
                    <Link to={ROUTES.SIGN_UP}>Signup</Link>
                </li>
                <li>
                    <Link to={ROUTES.SIGN_IN}>Signin</Link>
                </li>
            </nav>
            <Component {...props}/>
        </section> 
    </div>
)

const Landing = withLanding(() => {

    return <></>
})

export { withLanding }

export default Landing
