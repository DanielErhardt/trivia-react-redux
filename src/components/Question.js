import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addScoreAction } from '../redux/actions/player';

const CORRECT_ANSWER = 'correct-answer';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      locked: false,
    };
  }

  resetButtons = () => {
    document.querySelectorAll('.answerButton')
      .forEach((button) => {
        button.className = 'answerButton';
        button.disabled = false;
      });
  }

  paintButtons = () => {
    const buttons = document.querySelectorAll('.answerButton');
    buttons.forEach((button) => {
      if (button.id === CORRECT_ANSWER) {
        button.classList.add('correctAnswer');
      } else {
        button.classList.add('wrongAnswer');
      }

      button.disabled = true;
    });
  }

  resetState = () => {
    this.setState({
      locked: false,
    });
  }

  onQuestionAnswered = ({ target }) => {
    this.lockQuestion();

    if (target.id === CORRECT_ANSWER) {
      const { addScore, timer, questionInfo: { difficulty } } = this.props;

      let difficultyMultiplier = 1;

      if (difficulty === 'medium') difficultyMultiplier += 1;
      if (difficulty === 'hard') difficultyMultiplier += 2;

      const BASE_SCORE = 10;
      const score = BASE_SCORE + (timer * difficultyMultiplier);

      addScore(score);
    }
  }

  lockQuestion = () => {
    const { stopTimer } = this.props;
    stopTimer();
    this.paintButtons();

    this.setState({
      locked: true,
    });
  }

  render() {
    const { locked } = this.state;
    const { questionInfo, onClickNext, timer } = this.props;
    const { category, question, randomizedAnswers } = questionInfo;

    if (timer === 0 && !locked) this.lockQuestion();

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          {
            randomizedAnswers.map((answer, index) => {
              const testIdContent = answer.correct
                ? CORRECT_ANSWER : `wrong-answer-${index}`;
              return (
                <button
                  className="answerButton"
                  id={ testIdContent }
                  data-testid={ testIdContent }
                  key={ index }
                  type="button"
                  onClick={ this.onQuestionAnswered }
                >
                  {answer.text}
                </button>
              );
            })
          }
        </div>
        <br />
        {(locked) && (
          <button
            type="button"
            onClick={ () => {
              onClickNext();
              this.resetState();
              this.resetButtons();
            } }
          >
            Next
          </button>)}
      </div>
    );
  }
}

Question.propTypes = {
  questionInfo: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    randomizedAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  onClickNext: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  addScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.game.timer,
});

const mapDispatchToProps = (dispatch) => ({
  addScore: (score) => dispatch(addScoreAction(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
