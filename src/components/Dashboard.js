import React, {Component} from 'react'
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {connect} from 'react-redux'
import Poll from './PollSummary'
import classnames from 'classnames';

class Dashboard extends Component {
    state = {
        activeTab: '1'
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const {notAnsweredQIds, answeredQIds} = this.props
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '1'})}
                            onClick={() => {
                                this.toggle('1');
                            }}
                        >
                            Unanswered
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '2'})}
                            onClick={() => {
                                this.toggle('2');
                            }}
                        >
                            Answered
                        </NavLink>
                    </NavItem>

                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">

                        <ul>
                            {notAnsweredQIds.map((questionId) => (
                                <li key={questionId}><Poll id={questionId}/></li>
                            ))}
                        </ul>
                    </TabPane>
                    <TabPane tabId="2">
                        <ul>
                            {answeredQIds.map((questionId) => (
                                <li key={questionId}><Poll id={questionId}/></li>
                            ))}
                        </ul>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}

function mapStateToProps(_ref) {
    var questions = _ref.questions;
    var authedUser = _ref.authedUser;


    var notAnsweredQuestions = Object.values(questions).filter(function (question) {
        return !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser);
    });

    var answeredQuestions = Object.values(questions).filter(function (question) {
        return question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser);
    });

    return {
        notAnsweredQIds: Object.values(notAnsweredQuestions).sort(function (a, b) {
            return b.timestamp - a.timestamp;
        }).map(function (q) {
            return q.id;
        }),
        answeredQIds: Object.values(answeredQuestions).sort(function (a, b) {
            return b.timestamp - a.timestamp;
        }).map(function (q) {
            return q.id;
        })
    };
}
export default connect(mapStateToProps)(Dashboard)