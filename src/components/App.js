import React, {Component, Fragment} from 'react';
import LoadingBar from 'react-redux-loading'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from "./Dashboard";
import Login from './Login/Login'
import PageRoute from './Utiity/PageRouter'
import NewQuestion from './NewQuestion'
import {connect} from 'react-redux'
import {handleInitialData} from "../actions/shared"
import Leaderboard from "./Leaderboard/Leaderboard"
import Question from './Question/Question'
import Registration from "./Registration/Registration";
import {isEmpty} from "../utils/helpers";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    {this.props.loading === true
                        ? null
                        : <div>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Registration}/>
                            <PageRoute path="/" exact component={Dashboard}/>
                            <PageRoute path="/leaderboard" component={Leaderboard}/>
                            <PageRoute path="/add" component={NewQuestion}/>
                            <PageRoute path="/questions/:question_id" component={Question}/>
                        </div>}
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({questions, users}) {
    return {
        loading: isEmpty(questions) || isEmpty(users)
    }
}

export default connect(mapStateToProps)(App);
