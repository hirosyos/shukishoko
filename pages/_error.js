/* react */
import React, { Component } from 'react';
/* next */
import Router from 'next/router';

export default class _error extends Component {
  componentDidMount = () => {
    Router.push('/top');
  };

  render() {
    return <div />;
  }
}
