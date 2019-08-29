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
    newEnterprise: { name: '', address: '', telephone: '' }
  };

  toggleDrawer = (side, open) => {
    this.setState({
      [side]: open,
    });
  };

  toggleEnterpriseDialogState = newState => {
    this.setState({ enterpriseDialogState: newState,
      newEnterprise: { name: '', address: '', telephone: '' } });
  }

  updateNewEnterpriseInfo = (newValue, stateAtr) => {
    this.setState(state => ({ newEnterprise: { ...state.newEnterprise, [stateAtr]: newValue }}));
  }

  openDrawer = () => {
    const { fetchGeneralUserInfo, fetchGeneralAdminInfo, idUser, adminGeneral } = this.props;
    this.toggleDrawer('left', true);
    if (adminGeneral) {
      fetchGeneralAdminInfo();
    } else {
      fetchGeneralUserInfo({ idUsuario: idUser });
    }
  }

  renderSideMenuList = () => {
    const { userInfo } = this.props;
    const sideMenuList = [];
    userInfo.data.empresas.forEach((empresa) => {
      const sideMenuSubList = [];
      userInfo.data.equipos.forEach((equipo) => {
        if (empresa.idEmpresa === equipo.idEmpresa) {
          sideMenuSubList.push(
            <NavLink
              className="commonLink"
              key={`NavLink${equipo.nombre_equipo}`}
              to={`/Team/${equipo.idEquipo}`}
            >
              <ListItem key={`ListItem${equipo.nombre_equipo}`} button disabled={equipo.estado === 'inactivo'}>
                <ListItemText key={`ListItemText${equipo.nombre_equipo}`} primary={equipo.nombre_equipo} className="textOfListSideMenu" />
              </ListItem>
            </NavLink>
          );
        }
      });
      sideMenuList.push(
        <NavLink
          className="commonLink"
          key={`NavLink${empresa.nombre}`}
          to={`/Enterprise/${empresa.idEmpresa}`}
        >
          <ListItem key={`ListItem${empresa.nombre}`} button>
            <ListItemText key={`ListItemText${empresa.nombre}`} primary={empresa.nombre} className="textOfListSideMenu" />
          </ListItem>
        </NavLink>
      );
      sideMenuList.push(
        <ListItem key={`FatherListItem${empresa.nombre}`}>
          <List key={`List${empresa.nombre}`} className="subList">
            { sideMenuSubList }
          </List>
        </ListItem>
      );
    });
    return sideMenuList;
  }

  confirmEnterpriseCreation = () => {
    const { createEnterprise } = this.props;
    const { newEnterprise } = this.state;
    createEnterprise({
      nombre: newEnterprise.name,
      direccion: newEnterprise.address,
      telefono: parseInt(newEnterprise.telephone)
    });
    this.toggleEnterpriseDialogState(false);
  }

  render() {
    const { classes, userInfo, fetchingGeneralUserInfo, adminGeneral } = this.props;
    const { newEnterprise, enterpriseDialogState } = this.state;
    const sideList = (fetchingGeneralUserInfo || userInfo === undefined)
    ? (
      <div style={{ color: 'white' }}>
        Loading info...
      </div>
    ) : (
      <div className={classes.list}>
        <List>
          { this.renderSideMenuList() }
          {adminGeneral &&
            (<ListItem>
              <InputLabel className="textOfInputLabel">Add a new Enterprise</InputLabel>
              <IconButton
                aria-label="Delete"
                onClick={() => this.toggleEnterpriseDialogState(true)}
              >
                <CreateIcon style={{ color: 'white' }} />
              </IconButton>
            </ListItem>)
        }
        </List>
      </div>
    );
    return (
      <div>
        <Button onClick={() => this.openDrawer()}>
          <MenuIcon style={{ color: 'white' }} />
        </Button>
        <SwipeableDrawer
          open={this.state.left}
          onClose={() => this.toggleDrawer('left', false)}
          onOpen={() => this.openDrawer()}
        >
          <div
            className={classes.sideBar}
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer('left', false)}
            onKeyDown={() => this.toggleDrawer('left', false)}
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
            <div>
              <TextField
                label="Name"
                defaultValue={newEnterprise.name}
                onChange={event => this.updateNewEnterpriseInfo(event.target.value, 'name')}
              />
            </div>
            <div>
              <TextField
                label="Address"
                defaultValue={newEnterprise.address}
                onChange={event => this.updateNewEnterpriseInfo(event.target.value, 'address')}
              />
            </div>
            <div>
              <TextField
                label="Telephone"
                defaultValue={newEnterprise.telephone}
                onChange={event => this.updateNewEnterpriseInfo(event.target.value, 'telephone')}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.toggleEnterpriseDialogState(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.confirmEnterpriseCreation()}
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
  userInfo: PropTypes.shape({}).isRequired,
  fetchingGeneralUserInfo: PropTypes.bool.isRequired,
  fetchGeneralUserInfo: PropTypes.func.isRequired,
  fetchGeneralAdminInfo: PropTypes.func.isRequired,
  createEnterprise: PropTypes.func.isRequired,
  idUser: PropTypes.number.isRequired,
  adminGeneral: PropTypes.bool.isRequired
};

export default withStyles(styles)(SideMenu);
