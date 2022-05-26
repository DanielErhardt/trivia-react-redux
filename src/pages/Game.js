import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
      questionNumber: 0,
      currentQuestion: {
        number: -1,
        category: '',
        question: '',
        randomizedAnswers: [],
      },
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  decreaseTimer = () => {
    const { timer } = this.state;

    if (timer - 1 === 0) clearInterval(this.timer);

    this.setState({
      timer: timer - 1,
    });
  }

  startTimer = () => {
    const ONE_SECOND = 1000;

    this.setState({
      timer: 30,
    }, () => {
      this.stopTimer();
      this.timer = setInterval(this.decreaseTimer, ONE_SECOND);
    });
  }

  stopTimer = () => {
    clearInterval(this.timer);
  }

  onClickNext = () => {
    const { questionNumber } = this.state;
    this.startTimer();
    this.setState({
      questionNumber: questionNumber + 1,
    });
  }

  getCurrentQuestion = () => {
    const { questionNumber, currentQuestion } = this.state;

    if (currentQuestion.number === questionNumber) return currentQuestion;

    const { questions } = this.props;

    const {
      category, question,
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
      randomizedAnswers: mappedAnswers,
    };

    this.setState({
      currentQuestion: newQuestion,
    });

    return newQuestion;
  }

  render() {
    const { gameResponseCode } = this.props;
    const INVALID_TOKEN_CODE = 3;
    if (gameResponseCode === INVALID_TOKEN_CODE) {
      return (<Redirect to="/" />);
    }

    const { timer } = this.state;
    const currentQuestion = this.getCurrentQuestion();

    return (
      <div>
        <Header />
        <p>{ timer }</p>
        <Question
          questionInfo={ currentQuestion }
          onClickNext={ this.onClickNext }
          stopTimer={ this.stopTimer }
        />
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape).isRequired,
  gameResponseCode: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questionsInfo,
  gameResponseCode: state.game.responseCode,
});

export default connect(mapStateToProps)(Game);
