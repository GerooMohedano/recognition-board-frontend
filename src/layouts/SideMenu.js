import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MenuIcon from '@material-ui/icons/Menu'
import CreateIcon from '@material-ui/icons/Add';
import Team from '../pages/Team/Team';

require('./AppLayout.css');

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  sideBar: {
    backgroundColor: '#659BFF',
    height: '100%'
  }
};

class SideMenu extends React.Component {
  state = {
    left: false,
    enterpriseDialogState: false,
    newEnterprise: { name: '', address: '', city: '', telephone: '' }
  };

  onTeamNavLinkClick = team => {
    this.props.updateTeamClicked(team);
  }

  onEnterpriseNavLinkClick = enterprise => {
    this.props.updateEnterpriseClicked(enterprise);
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  toggleEnterpriseDialogState = newState => {
    this.setState({ enterpriseDialogState: newState,
      newEnterprise: { name: '', address: '', city: '', telephone: '' } });
  }

  updateNewEnterpriseInfo = (newValue, stateAtr) => {
    this.setState(state => ({ newEnterprise: { ...state.newEnterprise, [stateAtr]: newValue }}));
  }

  render() {
    const { classes } = this.props;
    const { newEnterprise, enterpriseDialogState } = this.state;
    const empresas = [{name: 'SOVOS', equipos: ['Octopus', 'Elephants']}, {name: 'SCANIA', equipos: ['Managers']}];
    const sideMenuList = [];
    empresas.forEach((empresa) => {
      const sideMenuSubList = [];
      empresa.equipos.forEach((equipo) => {
        sideMenuSubList.push(
          <NavLink
            className="commonLink"
            key={`NavLink${equipo}`}
            to={`/Team/${equipo}`}
            onClick={() => this.onTeamNavLinkClick(equipo)}
          >
            <ListItem key={`ListItem${equipo}`} button>
              <ListItemText key={`ListItemText${equipo}`} primary={equipo} className="textOfListSideMenu" />
            </ListItem>
          </NavLink>
        );
      });
      sideMenuList.push(
        <NavLink
          className="commonLink"
          key={`NavLink${empresa.name}`}
          to="/Enterprise"
          onClick={() => this.onEnterpriseNavLinkClick(empresa.name)}
        >
          <ListItem key={`ListItem${empresa.name}`} button>
            <ListItemText key={`ListItemText${empresa.name}`} primary={empresa.name} className="textOfListSideMenu" />
          </ListItem>
        </NavLink>
      );
      sideMenuList.push(
        <ListItem key={`FatherListItem${empresa.name}`}>
          <List key={`List${empresa.name}`} className="subList">
            { sideMenuSubList }
          </List>
        </ListItem>
      );
    });
    const sideList = (
      <div className={classes.list}>
        <List>
          { sideMenuList }
          <ListItem>
            <InputLabel className="textOfInputLabel">Add a new Enterprise</InputLabel>
            <IconButton
              aria-label="Delete"
              onClick={() => this.toggleEnterpriseDialogState(true)}
            >
              <CreateIcon style={{ color: 'white' }} />
            </IconButton>
          </ListItem>
        </List>
      </div>
    );
    return (
      <div>
        <Button onClick={this.toggleDrawer('left', true)}>
          <MenuIcon style={{ color: 'white' }} />
        </Button>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            className={classes.sideBar}
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            { sideList }
          </div>
        </SwipeableDrawer>
        <Dialog
          open={enterpriseDialogState}
          onClose={() => this.toggleEnterpriseDialogState(false)}
        >
          <DialogTitle>Add a new enterprise</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              defaultValue={newEnterprise.name}
              onChange={event => this.updateNewEnterpriseInfo(event.target.value, 'name')}
            />
            <TextField
              label="Address"
              defaultValue={newEnterprise.address}
              onChange={event => this.updateNewEnterpriseInfo(event.target.value, 'address')}
            />
            <TextField
              label="City"
              defaultValue={newEnterprise.city}
              onChange={event => this.updateNewEnterpriseInfo(event.target.value, 'city')}
            />
            <TextField
              label="Telephone"
              defaultValue={newEnterprise.telephone}
              onChange={event => this.updateNewEnterpriseInfo(event.target.value, 'telephone')}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.toggleEnterpriseDialogState(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.toggleEnterpriseDialogState(false)}
              color="primary"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  updateTeamClicked: PropTypes.func.isRequired,
  updateEnterpriseClicked: PropTypes.func.isRequired
};

export default withStyles(styles)(SideMenu);
