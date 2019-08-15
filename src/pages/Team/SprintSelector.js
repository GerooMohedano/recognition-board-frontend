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
    }
  }

  selectOlderSprint = value => {
    const { sprints, changeIndexPizarra } = this.props;
    const newIndex = sprints.findIndex(sprint => sprint.idPizarra === value.id);
    changeIndexPizarra(newIndex);
  }

  editSprintInformation = (value, definition) => {
    this.setState({ [definition]: value });
  }

  render() {
    const { classes, sprints, indexPizarra, shiftIndexPizarra } = this.props;
    const leftColor = indexPizarra === 0 ? '#E0E0E0' : '#649BFF';
    const rightColor = indexPizarra === sprints.length - 1 ? '#E0E0E0' : '#649BFF';
    return (
      <div className="sprintSelectorContainer">
        <div className="sprintEditor">
          <SprintEditor
            sprintName={sprints[indexPizarra].titulo}
            editSprintInformation={this.editSprintInformation}
            beginDate={sprints[indexPizarra].fechaInicio}
            endDate={sprints[indexPizarra].fechaFin}
            />
        </div>
        <div className="sprintNavigation">
          <Tooltip title="Go to the previous Sprint">
            <Fab
              aria-label="Delete"
              className="navigationButton"
              disabled={indexPizarra === 0}
              style={{ backgroundColor: leftColor }}
              onClick={() => shiftIndexPizarra(-1)}
            >
              <KeyboardArrowLeft style={{ zIndex: '1', color: 'white' }} />
            </Fab>
          </Tooltip>
          <h2 className="navigationButton">{ sprints[indexPizarra].titulo }</h2>
          <Tooltip title="Go to the next Sprint">
            <Fab
              aria-label="Delete"
              className="navigationButton"
              disabled={indexPizarra === sprints.length - 1}
              style={{ backgroundColor: rightColor }}
              onClick={() => shiftIndexPizarra(1)}
            >
              <KeyboardArrowRight
                style={{ zIndex: '1', color: 'white' }}
              />
            </Fab>
          </Tooltip>
        </div>
        <div className="barraParaBuscar">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <SearchSprints
              data={sprints.map(sprint => ({ id: sprint.idPizarra, sprint: sprint.titulo }))}
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
  sprints: PropTypes.shape({}).isRequired,
  indexPizarra: PropTypes.number.isRequired,
  shiftIndexPizarra: PropTypes.func.isRequired,
  changeIndexPizarra: PropTypes.func.isRequired
};

export default withStyles(styles)(SprintSelector);
