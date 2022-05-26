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
      questionNumber: 0,
      currentQuestion: {
        number: -1,
        category: '',
        question: '',
        randomizedAnswers: [],
      },
    };
  }

  onClickNext = () => {
    const { questionNumber } = this.state;
    this.setState({
      questionNumber: questionNumber + 1,
    });
  }

  getCurrentQuestionObject = () => {
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

    const SORT_CONST = 0.5;
    mappedAnswers.sort(() => Math.random() - SORT_CONST);

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
    const TOKEN_INVALID_CODE = 3;
    if (gameResponseCode === TOKEN_INVALID_CODE) {
      return (<Redirect to="/" />);
    }

    const currentQuestion = this.getCurrentQuestionObject();

    console.log(currentQuestion);

    return (
      <div>
        <Header />
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
