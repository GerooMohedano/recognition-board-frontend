import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import InputBase from '@material-ui/core/InputBase';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SprintEditor from './SprintEditor';

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
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
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
      endDate: '2019-08-13'
    }
  }

  editSprintInformation = (value, definition) => {
    this.setState({ [definition]: value });
  }

  render() {
    const { classes } = this.props;
    const { sprint, beginDate, endDate } = this.state;
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
          <Fab aria-label="Delete" className="navigationButton">
            <KeyboardArrowLeft />
          </Fab>
          <h2 className="navigationButton">{ sprint }</h2>
          <Fab aria-label="Delete" className="navigationButton">
            <KeyboardArrowRight />
          </Fab>
        </div>
        <div className="barraParaBuscar">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for other sprints..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
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
