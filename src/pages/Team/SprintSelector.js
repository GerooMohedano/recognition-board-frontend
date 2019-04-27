import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

require('./SprintSelector.css');

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const sprint = "Sprint 190301";

class SprintSelector extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="sprintNavigation">
        <Fab aria-label="Delete" className="navigationButton">
          <KeyboardArrowLeft />
        </Fab>
        <h2 className="navigationButton">{ sprint }</h2>
        <Fab aria-label="Delete" className="navigationButton">
          <KeyboardArrowRight />
        </Fab>
      </div>
    );
  }
}

SprintSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SprintSelector);
