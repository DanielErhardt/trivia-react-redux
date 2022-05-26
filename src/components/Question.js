import React from 'react';
import PropTypes from 'prop-types';

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
    const { questionInfo, onClickNext } = this.props;
    const { category, question, randomizedAnswers } = questionInfo;

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
        {locked && (
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
};

export default Question;
