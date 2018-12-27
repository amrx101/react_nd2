import React, {Fragment} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Container, Row} from 'reactstrap'
import Nav from './Navigation'


const PageRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route {...rest} render={(props) => {
        return (
            isAuthenticated
                ?
                <Fragment>
                    <Nav/>
                    <Container>
                        <Row>
                            <Component {...props}/>
                        </Row>
                    </Container>
                </Fragment>
                : <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
        )
    }}/>
)

function isEmpty(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function mapStateToProps(_ref) {
    var authedUser = _ref.authedUser;

    return {
        isAuthenticated: !isEmpty(authedUser)
    };
}

export default connect(mapStateToProps, null, null, {pure: false,})(PageRoute)