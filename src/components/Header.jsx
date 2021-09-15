import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ user: await getUser(), loading: false });
  };

  render() {
    const { user: { name }, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{name}</p>
        <nav>
          <Link data-testid="link-to-search" to="/search">
            Search
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites">
            Favorites
          </Link>
          <Link data-testid="link-to-profile" to="/profile">
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}
