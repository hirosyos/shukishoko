/* react */
import React, { Component } from 'react';
/* next */
import Router from 'next/router';

export default class Index extends Component {
  componentDidMount = () => {
    Router.push('/landing-page');
  };

  render() {
    return <div />;
  }
}
