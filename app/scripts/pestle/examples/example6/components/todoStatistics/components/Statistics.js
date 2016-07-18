import React from 'react';
import Counter from './Counter';

const Statistics = ({added, removed, toggled}) => (
  <div>
    <h1>Statistics</h1>
    <h2>Amount of todos:</h2>
    <ul>
      <li><Counter title="Added" value={added} /></li>
      <li><Counter title="Removed" value={removed} /></li>
      <li><Counter title="Toggled" value={toggled} /></li>
    </ul>
  </div>
)

export default Statistics
