import React, { Component } from 'react';

import Header from '../components/Header';
import fecthAlbums from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import SearchAlbum from '../components/SearchAlbum';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: '',
      artistSave: null,
      loading: false,
      albums: [],
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({ artistSave: artist, loading: true });
    const returnAlbums = await fecthAlbums(artist);
    this.setState({ loading: false, artist: '', albums: returnAlbums });
  }

  render() {
    const { artist, loading, artistSave, albums } = this.state;
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
            onClick={ this.handleClick }
          />
        </form>
        {loading && <Loading />}
        { artistSave !== null
        && <SearchAlbum albums={ albums } artistSave={ artistSave } /> }
      </div>
    );
  }
}
