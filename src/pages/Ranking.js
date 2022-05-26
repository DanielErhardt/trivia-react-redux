import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  clickToLogin =() => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.clickToLogin }
        >
          Login

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Ranking;
