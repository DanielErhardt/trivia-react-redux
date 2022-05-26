import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { gravatarURL, playerName, playerScore } = this.props;
    return (
      <div data-testid="nosso-header">
        <img data-testid="header-profile-picture" src={ gravatarURL } alt="gravatar" />
        <p data-testid="header-player-name">{ playerName }</p>
        <br />
        <p>Seu score total:</p>
        <p data-testid="header-score">{ playerScore }</p>
      </div>
    );
  }
}

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  gravatarURL: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerScore: state.player.score,
  gravatarURL: state.player.gravatarURL,
});

export default connect(mapStateToProps)(Header);
