import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { gravatarURL, playerName } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ gravatarURL } alt="gravatar" />
        <p data-testid="header-player-name">{ playerName }</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  gravatarURL: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  gravatarURL: state.player.gravatarURL,
});

export default connect(mapStateToProps)(Header);
