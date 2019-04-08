import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Team from '../pages/Team/Team';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class SideMenu extends React.Component {
  state = {
    left: false,
  };

  onNavLinkClick = equipo => {
    this.props.updateTeamClicked(equipo);
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const empresas = [{name: 'SOVOS', equipos: ['Octopus', 'Elephants']}, {name: 'SCANIA', equipos: ['Managers']}];
    const sideMenuList = [];
    empresas.forEach((empresa) => {
      const sideMenuSubList = [];
      empresa.equipos.forEach((equipo) => {
        sideMenuSubList.push(
          <NavLink key={`NavLink${equipo}`} to="/Team" onClick={() => this.onNavLinkClick(equipo)}>
            <ListItem key={`ListItem${equipo}`} button>
              <ListItemText key={`ListItemText${equipo}`} primary={equipo} />
            </ListItem>
          </NavLink>
        );
      });
      sideMenuList.push(
        <NavLink key={`NavLink${empresa.name}`} to="/Enterprise">
          <ListItem key={`ListItem${empresa.name}`} button>
            <ListItemText key={`ListItemText${empresa.name}`} primary={empresa.name} />
          </ListItem>
        </NavLink>
      );
      sideMenuList.push(
        <ListItem key={`FatherListItem${empresa.name}`}>
          <List key={`List${empresa.name}`}>
            { sideMenuSubList }
          </List>
        </ListItem>
      );
    });

    const sideList = (
      <div className={classes.list}>
        <List>
          { sideMenuList }
        </List>
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer('left', true)}>
          <MenuIcon style={{color: 'white'}} />
        </Button>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  updateTeamClicked: PropTypes.func.isRequired
};

export default withStyles(styles)(SideMenu);
