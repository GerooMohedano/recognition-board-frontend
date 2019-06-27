import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Tooltip from '@material-ui/core/Tooltip';
import SprintEditor from './SprintEditor';
import SearchSprints from '../../commons/CustomAutocomplete';

require('./SprintSelector.css');

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
    display: 'inline-flex',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  }
});

class SprintSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sprint: 'Sprint 190301',
      beginDate: '2017-08-20',
      endDate: '2019-08-13',
      olderSprints: [
        { id: 1, sprint: 'Sprint 190202' },
        { id: 2, sprint: 'Sprint 190201' },
        { id: 3, sprint: 'Sprint 190102' },
        { id: 4, sprint: 'Sprint 190101' },
        { id: 5, sprint: 'Sprint 181202' },
        { id: 6, sprint: 'Sprint 181201' }
      ]
    }
  }

  selectOlderSprint = value => {
    console.log('go to', value);
  }

  editSprintInformation = (value, definition) => {
    this.setState({ [definition]: value });
  }

  render() {
    const { classes } = this.props;
    const { sprint, beginDate, endDate, olderSprints } = this.state;
    return (
      <div className="sprintSelectorContainer">
        <div className="sprintEditor">
          <SprintEditor
            sprintName={sprint}
            editSprintInformation={this.editSprintInformation}
            beginDate={beginDate}
            endDate={endDate}
            />
        </div>
        <div className="sprintNavigation">
          <Tooltip title="Go to the previous Sprint">
            <Fab aria-label="Delete" className="navigationButton">
              <KeyboardArrowLeft />
            </Fab>
          </Tooltip>
          <h2 className="navigationButton">{ sprint }</h2>
          <Tooltip title="Go to the next Sprint">
            <Fab aria-label="Delete" className="navigationButton">
              <KeyboardArrowRight />
            </Fab>
          </Tooltip>
        </div>
        <div className="barraParaBuscar">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <SearchSprints
              data={olderSprints}
              upperFunction={this.selectOlderSprint}
              placeholder="Select another Sprint..."
              labelName="sprint"
            />
          </div>
        </div>
      </div>
    );
  }
}

SprintSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SprintSelector);
