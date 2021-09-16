import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  handleChange = async ({ target }) => {
    const { Song } = this.props;
    if (target.checked) {
      this.setState({ loading: true });
      await addSong(Song);
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
      this.setState({ loading: false });
      await removeSong(Song);
    }
  }

  render() {
    const { Song: { previewUrl, trackName, trackId } } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
          <input
            type="checkbox"
            name="checkbox"
            id={ trackId }
            onChange={ this.handleChange }
          />
        </label>
        { loading && <Loading /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  Song: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
  }).isRequired,
};
