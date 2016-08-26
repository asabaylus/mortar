'use strict';

import React from 'react';
import { PubSub } from '@natgeo/mortar-pestle';

const onForceUpdate = () => {
  PubSub.publish('Configurator.ForceUpdate');
};

const ForceButton = () => (
  <div className="mt3_row-gut-1">
    <p className="mt3_subh4">
      Sometimes the component is not refreshed on fly.
      Most of the time this is the accepted behavior, but
      for testing purposes force update will be very useful
      and will bypass that behavior.
    </p>
    <button className="mt3_btn mt3_btn--error" onClick={onForceUpdate}>Force Update</button>
  </div>
);

export default ForceButton;
