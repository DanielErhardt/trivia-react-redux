import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import { resetTimerAction, decreaseTimerAction } from '../redux/actions/game';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questionNumber: 0,
      currentQuestion: {
        number: -1,
        category: '',
        question: '',
        difficulty: '',
        randomizedAnswers: [],
      },
    };
  }

  componentDidMount() {
    this.startTimerInterval();
  }

  // componentWillUnmount() {
  //   console.log('unmount');
  //   this.clearTimerInterval();
  // }

  startTimerInterval = () => {
    const { decreaseTimer, resetTimer } = this.props;
    const ONE_SECOND = 1000;

    this.clearTimerInterval();
    resetTimer();
    this.timer = setInterval(decreaseTimer, ONE_SECOND);
  }

  clearTimerInterval = () => {
    clearInterval(this.timer);
  }

  onClickNext = () => {
    const { questionNumber } = this.state;
    const { history } = this.props;

    const LAST_QUESTION = 4;
    if (questionNumber === LAST_QUESTION) {
      this.clearTimerInterval();
      history.push('/feedback');
    } else {
      this.startTimerInterval();
      this.setState({
        questionNumber: questionNumber + 1,
      });
    }
  }

  getCurrentQuestion = () => {
    const { questionNumber, currentQuestion } = this.state;

    if (currentQuestion.number === questionNumber) return currentQuestion;

    const { questions } = this.props;

    const {
      category, question, difficulty,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionNumber];

    const answers = [correctAnswer, ...incorrectAnswers];

    const mappedAnswers = answers.map((answer, index) => {
      const correct = index === 0;
      return {
        correct,
        index: index - 1,
        text: answer,
      };
    });

    const SORT_CONSTANT = 0.5;
    mappedAnswers.sort(() => Math.random() - SORT_CONSTANT);

    const newQuestion = {
      number: questionNumber,
      category,
      question,
      difficulty,
      randomizedAnswers: mappedAnswers,
    };

    this.setState({
      currentQuestion: newQuestion,
    });

    return newQuestion;
  }

  render() {
    const { responseCode } = this.props;
    const INVALID_TOKEN_CODE = 3;
    if (responseCode === INVALID_TOKEN_CODE) {
      return (<Redirect to="/" />);
    }

    const { timer } = this.props;
    const currentQuestion = this.getCurrentQuestion();

    return (
      <div>
        <Header />
        <p>{ timer }</p>
        <Question
          questionInfo={ currentQuestion }
          onClickNext={ this.onClickNext }
          stopTimer={ this.clearTimerInterval }
        />
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape).isRequired,
  responseCode: PropTypes.number.isRequired,
  decreaseTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  history: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.game.timer,
  questions: state.game.questionsInfo,
  responseCode: state.game.responseCode,
});

const mapDispatchToProps = (dispatch) => ({
  resetTimer: () => dispatch(resetTimerAction()),
  decreaseTimer: () => dispatch(decreaseTimerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
