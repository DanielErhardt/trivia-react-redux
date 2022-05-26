import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
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
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  finalScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  finalScore: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
