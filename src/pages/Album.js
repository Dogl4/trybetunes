import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      artist: '',
      album: '',
      img: '',
      api: false,
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    this.setState({
      songs,
      artist: songs[0].artistName,
      album: songs[0].collectionName,
      img: songs[0].artworkUrl100,
      api: true,
    });
  }

  renderResolvs = () => {
    const { songs, artist, album, img, api } = this.state;
    if (api) {
      return (
        <div>
          <h3 data-testid="artist-name">{ artist }</h3>
          <h3 data-testid="album-name">{ album }</h3>
          <img src={ img } alt={ album } />
          { songs.map((song, i) => i > 0 && <MusicCard key={ i } Song={ song } />) }
        </div>
      );
    }
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        { this.renderResolvs() }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
