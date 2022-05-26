import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  onClickPlayAgain = () => {
    // limpar o store
    const { history } = this.props;
    history.push('/');
  }

  onClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, finalScore } = this.props;
    const ASSERTIONS = 3;
    const feedbackText = assertions >= ASSERTIONS ? 'Well Done!' : 'Could be better...';
    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{finalScore}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-text">{feedbackText}</p>

        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.onClickPlayAgain }
        >
          Play Again
        </button>

        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.onClickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  finalScore: PropTypes.number.isRequired,
  history: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  finalScore: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
