'use strict';

import React from 'react';
import {PubSub} from '@natgeo/mortar-pestle';

export default class Component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };

    this.handlePublish = this.handlePublish.bind(this);
    this.readData = this.readData.bind(this);
  }

  componentWillMount() {
    this.token = PubSub.subscribe('topic', this.readData);
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  readData(msg, data) {
    this.setState({
      data
    });
  }

  handlePublish() {
    PubSub.publish('topic', '123...123...');
  }

  render() {
    const publishedData = (this.state.data) ? <p>Data published: {this.state.data}</p> : <p>Waiting for a publish event...</p>;

    return (
      <div>
        <h2>I'm a React Component with PubSub</h2>
        {publishedData}
        <p><button onClick={this.handlePublish}>Publish something</button></p>
      </div>
    );
  }
}
