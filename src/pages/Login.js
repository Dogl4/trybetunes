import React, { Component } from 'react';

import { Redirect } from 'react-router';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false,
      loaded: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { name } = this.state;
    this.setState({ loading: true });
    createUser({ name }).then((dados) => {
      if (dados === 'OK') {
        this.setState({ loading: false, loaded: true });
      }
    });
  };

  render() {
    const MIN_CARACTER = 3;
    const { name, loading, loaded } = this.state;
    if (loading) return <Loading />;
    if (loaded) return <Redirect to="/search" />;
    return (
      <form data-testid="page-login">
        Login
        <label htmlFor="name-input">
          Name:
          <input
            id="name-input"
            type="text"
            name="name"
            data-testid="login-name-input"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <input
          type="submit"
          data-testid="login-submit-button"
          value="Entrar"
          disabled={ MIN_CARACTER > name.length }
          onClick={ this.handleClick }
        />
      </form>
    );
  }
}
