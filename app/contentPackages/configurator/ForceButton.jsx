'use strict';

import React from 'react';
import { PubSub } from '@natgeo/mortar-pestle';

const onForceUpdate = () => {
  PubSub.publish('Configurator.ForceUpdate');
};

const ForceButton = () => (
  <div className="mt2_row-gut-1">
    <p className="mt2_subh4">
      Sometimes the component is not refreshed on fly.
      Most of the time this is the excepted behavior, but
      for testing propuses force update will be very useful
      and will bypass that behavior.
    </p>
    <button className="mt2_btn mt2_btn--error" onClick={onForceUpdate}>Force Update</button>
  </div>
);

export default ForceButton;
