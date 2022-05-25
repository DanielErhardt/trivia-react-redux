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
    };
  }

  onQuestionAnswered = () => {
    const { questionNumber } = this.state;
    this.setState({
      questionNumber: questionNumber + 1,
    });
  }

  render() {
    const { gameResponseCode } = this.props;
    const TOKEN_INVALID_CODE = 3;
    if (gameResponseCode === TOKEN_INVALID_CODE) {
      return (<Redirect to="/" />);
    }

    const { questions } = this.props;
    const { questionNumber } = this.state;

    return (
      <div>
        <Header />
        <Question
          questionInfo={ questions[questionNumber] }
          onQuestionAnswered={ this.onQuestionAnswered }
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

// const mapDispatchToProps = (dispatch) => ({
// });

export default connect(mapStateToProps)(Game);
