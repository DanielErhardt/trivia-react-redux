import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerPlayerAction } from '../redux/actions';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      gravatarEmail: '',
      name: '',
      isButtonDisabled: true,
    };
  }

  isLoginValid = () => {
    // Regex tirado do link https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const NAME_MINIMUM_LENGTH = 2;
    const { gravatarEmail, name } = this.state;
    return EMAIL_VALIDATION_REGEX
      .test(gravatarEmail) && name.length >= NAME_MINIMUM_LENGTH;
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        isButtonDisabled: !this.isLoginValid(),
      });
    });
  }

  onLoggedIn = () => {
    const { history, registerPlayer } = this.props;
    const { name, gravatarEmail } = this.state;
    registerPlayer(name, gravatarEmail);
    history.push('/');
  }

  render() {
    const { gravatarEmail, name, isButtonDisabled } = this.state;

    return (
      <div>

        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>

        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          value={ name }
          onChange={ this.handleInputChange }
        />

        <input
          type="email"
          data-testid="input-gravatar-email"
          name="gravatarEmail"
          value={ gravatarEmail }
          onChange={ this.handleInputChange }
        />

        <button
          type="button"
          data-testid="btn-play"
          disabled={ isButtonDisabled }
          onClick={ this.onLoggedIn }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape.isRequired,
  registerPlayer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  registerPlayer:
  (name, gravatarEmail) => dispatch(registerPlayerAction(name, gravatarEmail)),
});

export default connect(null, mapDispatchToProps)(Login);