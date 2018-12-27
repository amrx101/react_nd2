import React, {Component} from 'react'
import {connect} from 'react-redux'

import UserSummary from '../Utiity/UserSummary'

class Leaderboard extends Component {
    render() {
        const {users} = this.props
        return (
            <div>
                <h1>Leaderboard</h1>
                {users.map((userId) =>
                    <UserSummary key={userId} id={userId}/>
                )}
            </div>
        )
    }
}

function mapStateToProps(_ref) {
    var users = _ref.users;
    return {
        users: Object.keys(users).sort(function (a, b) {
            return Object.keys(users[b].answers).length + users[b].questions.length - (Object.keys(users[a].answers).length + users[a].questions.length);
        })
    };
}

export default connect(mapStateToProps)(Leaderboard)