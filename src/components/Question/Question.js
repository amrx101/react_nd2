import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Row} from 'reactstrap'
import {handleAnswerQuestion} from '../../actions/questions'
import Option from "./Option"
import UserSummary from '../Utiity/UserSummary'
import MissingQuestion from "./MissingQuestion";

class Question extends Component {
    state = {
        vote: false
    }

    handleVote = (vote) => {
        const {dispatch, question} = this.props
        dispatch(handleAnswerQuestion(question.id, vote))
    }

    render() {
        const {question} = this.props
        return (
            <Fragment>
                {question
                    ?
                    (<div>
                        <h1>Would you rather</h1>
                        <Row>
                            <UserSummary id={question.author}/>
                        </Row>
                        <Row>
                            <Option questionId={question.id} optionName="optionOne" onClick={this.handleVote}/>
                            <Option questionId={question.id} optionName="optionTwo" onClick={this.handleVote}/>
                        </Row>
                    </div>)
                    : <MissingQuestion/>}
            </Fragment>
        )
    }
}

function mapStateToProps(_ref, props) {
    var questions = _ref.questions;
    var users = _ref.users;
    var authedUser = _ref.authedUser;
    var question_id = props.match.params.question_id;

    var question = questions[question_id];
    var user = users[authedUser];

    return {
        question: question,
        authedUser: authedUser,
        showResults: Object.keys(user.answers).includes(question_id)
    };
}

export default connect(mapStateToProps)(Question)