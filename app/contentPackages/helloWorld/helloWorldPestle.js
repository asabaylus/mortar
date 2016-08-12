'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/mortar-pestle';
import HelloWorldComponent from './helloWorld.jsx';
import HelloWorldConfigurator from './configurator.jsx';

class HelloWorld extends Module {
  init() {
    const props = {
      initialProps: {
        title: this.options.title,
        image: {
          url: this.options.image.url,
          position: this.options.image.position,
          height: this.options.image.height
        }
      }
    };

    ReactDOM.render(
      <div>
        <HelloWorldConfigurator {...props} />
      </div>
      , this.el);
  }
}

Pestle.ModuleManager.register('HelloWorld', HelloWorld);

export default HelloWorld;
