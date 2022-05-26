import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      if (button.id === 'correct-answer') {
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

  onQuestionAnswered = () => {
    // registrar pontuação
    this.lockQuestion();
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
                ? 'correct-answer' : `wrong-answer-${index}`;
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
  }).isRequired,
  onClickNext: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.game.timer,
});

export default connect(mapStateToProps)(Question);
