import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, CardBody, CardSubtitle, CardTitle} from 'reactstrap'
import './Option.css'


class Option extends Component {
    handleClick = (e) => {
        e.preventDefault()
        const {onClick, optionName} = this.props
        onClick(optionName)
    }

    render() {
        const {option, showResults, isVoted, percentage} = this.props

        const {text, votes} = option
        return (
            showResults === false ?
                <Link to="#" onClick={this.handleClick}>
                    <Card className={isVoted ? ("selected-option") : ''}>
                        <CardBody>
                            <CardTitle>{text}</CardTitle>
                            {showResults === true &&
                            (<CardSubtitle>Numbero Of Votes: {votes.length} ({percentage}%)</CardSubtitle>)
                            }
                        </CardBody>
                    </Card>
                </Link>
                :
                <Card className={isVoted ? ("selected-option") : ''}>
                    <CardBody>
                        <CardTitle>{text}</CardTitle>
                        {showResults === true &&
                        (<CardSubtitle>Numbero Of Votes: {votes.length} ({percentage}%)</CardSubtitle>)
                        }
                    </CardBody>
                </Card>
        )
    }
}

function mapStateToProps(_ref, _ref2) {
    var authedUser = _ref.authedUser;
    var questions = _ref.questions;
    var users = _ref.users;
    var questionId = _ref2.questionId;
    var optionName = _ref2.optionName;

    var question = questions[questionId];
    var option = question[optionName];
    var currentUser = users[authedUser];

    return {
        option: option,
        isVoted: option.votes.includes(authedUser),
        showResults: Object.keys(currentUser.answers).includes(questionId),
        percentage: (option.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100).toFixed(2),
        optionName: optionName
    };
}
export default connect(mapStateToProps)(Option)