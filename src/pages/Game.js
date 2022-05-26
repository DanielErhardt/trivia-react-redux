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
      numberControl: -1,
      currentQuestion: {
        number: 0,
        category: '',
        question: '',
        randomizedAnswers: [],
      },
    };
  }

  decreaseTimer = () => {
    const { timer } = this.state;

    if (timer - 1 === 0) clearInterval(this.timer);

    this.setState({
      timer: timer - 1,
    });
  }

  restartTimer = () => {
    const ONE_SECOND = 1000;

    this.setState({
      timer: 30,
    }, () => {
      clearInterval(this.timer);
      this.timer = setInterval(this.decreaseTimer, ONE_SECOND);
    });
  }

  onClickNext = () => {
    const { numberControl } = this.state;
    this.setState({
      numberControl: numberControl + 1,
    });
  }

  getCurrentQuestionObject = () => {
    const { numberControl, currentQuestion } = this.state;

    if (currentQuestion.number === numberControl) return currentQuestion;

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

    const SORT_CONST = 0.5;
    mappedAnswers.sort(() => Math.random() - SORT_CONST);

    const newQuestion = {
      number: numberControl,
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
    const currentQuestion = this.getCurrentQuestionObject();

    console.log(currentQuestion);

    return (
      <div>
        <Header />
        <p>{ timer }</p>
        <Question
          questionInfo={ currentQuestion }
          onClickNext={ this.onClickNext }
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
