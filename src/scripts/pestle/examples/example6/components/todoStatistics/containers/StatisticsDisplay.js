'use strict'
import { connect } from 'react-redux';
import Statistics from '../components/Statistics';

const mapStateToProps = (state, ownProps) => {
  return {
    added: state.statistics.added,
    removed: state.statistics.removed,
    toggled: state.statistics.toggled
  }
}

const StatisticsDisplay = connect(mapStateToProps)(Statistics)

export default StatisticsDisplay;
