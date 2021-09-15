import React, { Component } from 'react';

import Header from '../components/Header';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const { artist } = this.state;
    const MIN_LENGTH = 2;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        <form>
          <input
            type="text"
            name="artist"
            value={ artist }
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <input
            type="button"
            value="Pesquisar"
            data-testid="search-artist-button"
            disabled={ MIN_LENGTH > artist.length }
          />
        </form>
      </div>
    );
  }
}
