import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  // Tirado do link https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  // shuffleArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i -= 1) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     const temp = array[i];
  //     array[i] = array[j];
  //     array[j] = temp;
  //   }

  //   return array;
  // }

  // arrangeTrueOfFalse = (array) => {
  //   const result = [];
  //   result.push(array.find((e) => e.text === 'True'));
  //   result.push(array.find((e) => e.text === 'False'));
  //   return result;
  // }

  render() {
    const { questionInfo, onQuestionAnswered } = this.props;

    const {
      category, question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questionInfo;

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

    console.log(mappedAnswers);

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          {
            mappedAnswers.map((answer, index) => {
              const testIdContent = answer.correct
                ? 'correct-answer' : `wrong-answer-${index}`;
              return (
                <button
                  className=""
                  data-testid={ testIdContent }
                  key={ index }
                  type="button"
                  onClick={ onQuestionAnswered }
                >
                  {answer.text}
                </button>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  questionInfo: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onQuestionAnswered: PropTypes.func.isRequired,
};

export default Question;
