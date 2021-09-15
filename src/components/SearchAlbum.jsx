import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export default class SearchAlbum extends Component {
  render() {
    const { albums, artistSave } = this.props;
    return (
      <div>
        {console.log(albums)}
        <p>
          { Object.entries(albums).length > 0 ? `Resultado de álbuns de: ${artistSave}`
            : 'Nenhum álbum foi encontrado' }
        </p>
        { console.log(albums, 'albums') }
        { albums.map(({ artistName, collectionId, collectionName, artworkUrl100 }, i) => (
          <div key={ i }>
            {' '}
            <Link
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
            >
              <p>{collectionName}</p>
              <img src={ artworkUrl100 } alt={ collectionName } />
              <p>{artistName}</p>
            </Link>
            {' '}
          </div>)) }
      </div>
    );
  }
}

SearchAlbum.propTypes = {
  albums: PropTypes.arrayOf.isRequired,
  artistSave: PropTypes.string.isRequired,
};
