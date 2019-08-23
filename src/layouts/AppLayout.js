import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Snackbar from '@material-ui/core/Snackbar';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import SideMenu from './SideMenu'
import SearchBar from './SearchBar';

require('./AppLayout.css');

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: {
    backgroundColor: '#C670CC'
  }
});

class AppLayout extends React.Component {
  state = {
    anchor: null,
    changePasswordDialog: false,
    wrongPassword: false,
    password: '',
    newPassword1: '',
    newPassword2: ''
  };

  handleOpenProfileMenu = event => {
    this.setState({ anchor: event.currentTarget });
  }

  handleClosePasswordDialog = () => {
    this.setState({
      changePasswordDialog: false,
      password: '',
      newPassword1: '',
      newPassword2: ''
    });
  }

  updatePasswordField = (value, field) => {
    this.setState({ [field]: value });
  }

  checkPassword = () => {
    const { newPassword1, newPassword2 } = this.state;
    if (newPassword1 === newPassword2) {
      this.handleClosePasswordDialog();
    } else {
      this.setState({ wrongPassword: true })
    }
  }

  render() {
    const { anchor, changePasswordDialog, password, newPassword1, newPassword2, wrongPassword } = this.state;
    const { classes, userInfo, fetchingGeneralUserInfo, fetchGeneralUserInfo, createEnterprise } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <SideMenu
              userInfo={userInfo}
              fetchingGeneralUserInfo={fetchingGeneralUserInfo}
              fetchGeneralUserInfo={fetchGeneralUserInfo}
              createEnterprise={createEnterprise}
            />
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              OnBoard
            </Typography>
            <SearchBar
              userInfo={userInfo}
              fetchingGeneralUserInfo={fetchingGeneralUserInfo}
              fetchGeneralUserInfo={fetchGeneralUserInfo}
            />
            <div className={classes.grow} />
            <div>
              <IconButton
                onClick={event => this.handleOpenProfileMenu(event)}
                aria-owns="material-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

            </div>
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={anchor}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchor)}
          onClose={() => this.setState({ anchor: null })}
        >
          <NavLink to="/Perfil/1" className="linkPerfil">
            <MenuItem>Profile</MenuItem>
          </NavLink>
          <MenuItem onClick={() => this.setState({ changePasswordDialog: true })}>Change Password</MenuItem>
          <MenuItem onClick={() => this.setState({ anchor: null })}>Log out</MenuItem>
        </Menu>
        <Dialog
          open={changePasswordDialog}
          onClose={() => this.handleClosePasswordDialog()}
        >
          <DialogTitle>Change your password</DialogTitle>
          <DialogContent>
            <div>
              <TextField
                label="Actual password"
                type="password"
                defaultValue={password}
                onChange={event => this.updatePasswordField(event.target.value, 'password')}
              />
            </div>
            <div>
              <TextField
                label="New password"
                type="password"
                defaultValue={newPassword1}
                onChange={event => this.updatePasswordField(event.target.value, 'newPassword1')}
              />
            </div>
            <div>
              <TextField
                label="Confirm new password"
                type="password"
                defaultValue={newPassword2}
                onChange={event => this.updatePasswordField(event.target.value, 'newPassword2')}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleClosePasswordDialog()}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.checkPassword()}
              color="primary"
              disabled={password === '' || newPassword1 === '' || newPassword2 === ''}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          variant="error"
          open={wrongPassword}
          autoHideDuration={6000}
          onClose={() => this.setState({ wrongPassword: false})}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">The new password and its confirmation doesn't match</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="secondary"
              className={classes.close}
              onClick={() => this.setState({ wrongPassword: false})}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchGeneralUserInfo: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({}).isRequired,
  createEnterprise: PropTypes.func.isRequired,
  fetchingGeneralUserInfo: PropTypes.bool.isRequired
};

export default withStyles(styles)(AppLayout);
